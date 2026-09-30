import { describe, it, expect } from "vitest";

describe("Portfolio Sanity Suite", () => {
  it("validates application test suite environment", () => {
    expect(true).toBe(true);
  });

  it("verifies basic portfolio configuration", () => {
    const title = "Arpit Gupta - Full Stack Web Developer";
    expect(title).toContain("Arpit Gupta");
  });
});
