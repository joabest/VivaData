import { describe, expect, it } from "vitest";
import { competitorSchema } from "./validators";

describe("competitor TikTok URL", () => {
  it.each(["tiktok.com", "www.tiktok.com", "shop.tiktok.com"])("accepts %s", (host) => {
    expect(competitorSchema.safeParse({ name: "Demo", shopUrl: `https://${host}/demo` }).success).toBe(true);
  });
  it.each(["not-tiktok.com", "eviltiktok.com", "tiktok.com.example.com"])("rejects %s", (host) => {
    expect(competitorSchema.safeParse({ name: "Demo", shopUrl: `https://${host}/demo` }).success).toBe(false);
  });
});
