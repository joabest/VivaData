import type { NextAuthConfig } from "next-auth";

/** Edge-safe configuration. Never import Prisma or bcrypt from this module. */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  trustHost: true,
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
      ].some((path) => nextUrl.pathname.startsWith(path));

      if (!privatePath) return true;
      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;
