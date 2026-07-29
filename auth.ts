import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { credentialsSchema } from "@/lib/validators";
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [Credentials({ credentials: { email: {}, password: {} }, async authorize(raw) { const parsed = credentialsSchema.safeParse(raw); if (!parsed.success) return null; const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } }); if (!user || !(await compare(parsed.data.password, user.passwordHash))) return null; return { id: user.id, email: user.email, name: user.name, role: user.role }; } })],
  callbacks: { jwt({ token, user }) { if (user) token.id = user.id; return token; }, session({ session, token }) { if (session.user) session.user.id = String(token.id); return session; } }
});
