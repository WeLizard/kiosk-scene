from __future__ import annotations

import logging
import signal
import threading

from .api import ApiContext, ApiServer
from .app import Domovoy
from .assistant.pipeline import CommandPipeline
from .assistant.voice import VoiceGateway
from .auth import Authenticator
from .config import Settings
from .frontends.alice import AliceFrontend
from .frontends.assist import AssistFrontend
from .scheduler import Scheduler

LOG = logging.getLogger("domovoy")


def build(app: Domovoy) -> tuple[ApiContext, Scheduler]:
    pipeline = CommandPipeline(app)
    voice = VoiceGateway(app, pipeline)
    scheduler = Scheduler(app)
    context = ApiContext(app, pipeline, voice, AliceFrontend(app, pipeline, voice), AssistFrontend(voice),
                         Authenticator(app.secrets, trust_local=app.env.trust_local), scheduler)
    return context, scheduler


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="[%(asctime)s] %(levelname)s %(name)s: %(message)s", datefmt="%H:%M:%S")
    env = Settings()
    app = Domovoy(env)
    context, scheduler = build(app)
    server = ApiServer((env.host, env.port), context)
    scheduler.start()
    stop = threading.Event()

    def shutdown(*_: object) -> None:
        if not stop.is_set():
            stop.set()
            threading.Thread(target=server.shutdown, daemon=True).start()

    signal.signal(signal.SIGTERM, shutdown)
    signal.signal(signal.SIGINT, shutdown)
    LOG.info("Domovoy %s listening on http://%s:%s (data: %s)", "0.1.0", env.host, env.port, env.data_dir)
    try:
        server.serve_forever()
    finally:
        scheduler.stop()
        server.server_close()
        app.close()


if __name__ == "__main__":
    main()
