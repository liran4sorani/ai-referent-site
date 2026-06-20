import { describe, expect, it } from "vitest";
import "dotenv/config";

describe("Resend API key", () => {
  it("RESEND_API_KEY env var is set", () => {
    expect(process.env.RESEND_API_KEY).toBeTruthy();
    expect(process.env.RESEND_API_KEY).toMatch(/^re_/);
  });

  it("Resend client initializes without throwing", async () => {
    const { Resend } = await import("resend");
    expect(() => new Resend(process.env.RESEND_API_KEY)).not.toThrow();
  });
});
