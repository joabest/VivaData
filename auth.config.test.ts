import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { authConfig } from "./auth.config";

const authorized = authConfig.callbacks.authorized;
function check(path: string, loggedIn: boolean) {
  return authorized({
    auth: loggedIn ? { user: { id: "demo", name: "Demo" }, expires: "2099-01-01" } : null,
    request: new NextRequest(`https://vivadata.dev${path}`),
  });
}

describe("private routes", () => {
  it.each(["dashboard", "competitors", "products", "creators", "videos", "lives", "alerts", "categories", "trends", "reports", "comparisons", "integrations", "subscription", "settings"])("protects /%s and nested routes", (section) => {
    for (const path of [`/${section}`, `/${section}/demo`]) {
      expect(check(path, false)).toBe(false);
      expect(check(path, true)).toBe(true);
    }
  });
  it.each(["/", "/login", "/register", "/settings-public"])("keeps %s public", (path) => {
    expect(check(path, false)).toBe(true);
  });
});
