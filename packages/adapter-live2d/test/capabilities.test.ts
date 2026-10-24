import { describe, expect, it } from "vitest";
import { createLive2dAdapter, live2dCapabilities } from "../src/index";

describe("live2d adapter capabilities", () => {
  it("declares that the runtime renders state.message itself", () => {
    const adapter = createLive2dAdapter();

    expect(adapter.getCapabilities().rendersStateMessage).toBe(true);
    expect(live2dCapabilities.rendersStateMessage).toBe(true);
  });
});
