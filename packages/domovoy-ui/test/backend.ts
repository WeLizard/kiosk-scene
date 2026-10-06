import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

export const pythonAvailable = spawnSync("python3", ["--version"]).status === 0;

export interface Backend {
  url: string;
  dataDir: string;
  /** Stops the process but keeps the data directory and port: a restart of the add-on. */
  halt(): Promise<void>;
  /** Starts it again on the same port and data. */
  resume(): Promise<void>;
  stop(): Promise<void>;
  log(): string;
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as net.AddressInfo;
      server.close(() => resolve(port));
    });
  });
}

/** Starts the real Domovoy service (the same entry point the add-on runs) on a free port with a scratch data dir. */
export async function startBackend(extraEnv: Record<string, string> = {}): Promise<Backend> {
  const port = await freePort();
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "domovoy-ui-e2e-"));
  const root = path.resolve(__dirname, "../../../kiosk_scene");
  const url = `http://127.0.0.1:${port}/`;
  let output = "";
  let child: ChildProcess | null = null;

  const launch = async (): Promise<void> => {
    output += "\n--- start ---\n";
    const proc = spawn("python3", [path.join(root, "domovoy_service.py")], {
      cwd: root,
      env: {
        ...process.env,
        DOMOVOY_DATA_DIR: dataDir,
        DOMOVOY_PORT: String(port),
        DOMOVOY_BIND: "127.0.0.1",
        DOMOVOY_TIMEZONE: "Europe/Moscow",
        DOMOVOY_SCHEDULER_INTERVAL: "1",
        PYTHONUNBUFFERED: "1",
        ...extraEnv,
      },
    });
    child = proc;
    proc.stdout?.on("data", (chunk) => (output += String(chunk)));
    proc.stderr?.on("data", (chunk) => (output += String(chunk)));
    const deadline = Date.now() + 15_000;
    for (;;) {
      if (proc.exitCode !== null) {
        throw new Error(`Domovoy exited early:\n${output}`);
      }
      try {
        await new Promise<void>((resolve, reject) => {
          http.get(`${url}health`, (res) => {
            res.resume();
            if (res.statusCode === 200) {
              resolve();
            } else {
              reject(new Error(String(res.statusCode)));
            }
          }).on("error", reject);
        });
        return;
      } catch {
        if (Date.now() > deadline) {
          proc.kill("SIGKILL");
          throw new Error(`Domovoy did not become healthy:\n${output}`);
        }
        await new Promise((r) => setTimeout(r, 100));
      }
    }
  };

  const halt = async (): Promise<void> => {
    const proc = child;
    if (proc && proc.exitCode === null) {
      await new Promise<void>((resolve) => {
        proc.once("exit", () => resolve());
        proc.kill("SIGTERM");
        setTimeout(() => proc.kill("SIGKILL"), 4000).unref();
      });
    }
  };

  await launch();
  return {
    url,
    dataDir,
    log: () => output,
    halt,
    resume: launch,
    async stop() {
      await halt();
      fs.rmSync(dataDir, { recursive: true, force: true });
    },
  };
}

/** `fetch` over node:http, so the tests talk to a real server without happy-dom's browser-only CORS rules. */
export const nodeFetch: typeof fetch = (input, init) =>
  new Promise((resolve, reject) => {
    const url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url);
    const signal = init?.signal ?? undefined;
    if (signal?.aborted) {
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
      return;
    }
    const headers: Record<string, string> = {};
    new Headers(init?.headers as HeadersInit | undefined).forEach((value, key) => (headers[key] = value));
    const req = http.request(url, { method: init?.method ?? "GET", headers }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(new Response(Buffer.concat(chunks).toString("utf8"), { status: res.statusCode ?? 0 })));
    });
    req.on("error", reject);
    signal?.addEventListener("abort", () => {
      req.destroy();
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
    }, { once: true });
    const body = init?.body;
    if (body instanceof Blob) {
      void body.arrayBuffer().then((buf) => req.end(Buffer.from(buf)));
    } else {
      req.end(body === undefined || body === null ? undefined : String(body));
    }
  });
