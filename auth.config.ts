import type { NextAuthConfig } from "next-auth";

/** Edge-safe configuration. Never import Prisma or bcrypt from this module. */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const privatePath = [
        "/dashboard",
        "/competitors",
        "/products",
        "/creators",
        "/videos",
        "/lives",
        "/alerts",
        "/categories",
        "/trends",
        "/reports",
        "/comparisons",
        "/integrations",
        "/subscription",
        "/settings",
      ].some((path) => nextUrl.pathname === path || nextUrl.pathname.startsWith(`${path}/`));

      if (!privatePath) return true;
      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;
