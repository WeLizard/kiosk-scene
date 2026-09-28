import { describe, expect, it } from "vitest";
import { dayKey, isoToLocalInput, zonedToIso } from "../src/util";

describe("household-zone time conversion", () => {
  it("round-trips ordinary times in DST zones", () => {
    for (const tz of ["Europe/Sofia", "Europe/Berlin", "Europe/Moscow", "UTC", "America/New_York"]) {
      for (const local of ["2026-01-15T09:30", "2026-07-15T09:30", "2026-03-28T23:59", "2026-10-24T00:00"]) {
        expect(isoToLocalInput(zonedToIso(local, tz), tz), `${tz} ${local}`).toBe(local);
      }
    }
  });

  it("is correct across the autumn change (the repeated hour) and the spring gap", () => {
    // Sofia: clocks go back on 2026-10-25 at 04:00 EEST → 03:00 EET, so 03:30 happens twice; the first (EEST) wins
    expect(zonedToIso("2026-10-25T03:30", "Europe/Sofia")).toMatch(/^2026-10-25T0[01]:30:00Z$/);
    expect(isoToLocalInput("2026-10-25T01:30:00Z", "Europe/Sofia")).toBe("2026-10-25T03:30");
    // the day after the change is offset +2 again
    expect(zonedToIso("2026-10-26T09:00", "Europe/Sofia")).toBe("2026-10-26T07:00:00Z");
    // spring: 03:30 does not exist on 2026-03-29 in Sofia; it rolls forward instead of producing a wrong day
    const gap = zonedToIso("2026-03-29T03:30", "Europe/Sofia");
    expect(gap.startsWith("2026-03-29T")).toBe(true);
    expect(isoToLocalInput(gap, "Europe/Sofia").startsWith("2026-03-29T0")).toBe(true);
  });

  it("day keys follow the household's zone, not the machine's", () => {
    expect(dayKey("2026-09-28T22:30:00Z", "Europe/Moscow")).toBe("2026-09-29");
    expect(dayKey("2026-09-28T22:30:00Z", "America/New_York")).toBe("2026-09-28");
    expect(() => zonedToIso("tomorrow", "UTC")).toThrow();
  });
});
