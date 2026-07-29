export { auth as middleware } from "@/auth";
export const config = { matcher: ["/dashboard/:path*", "/competitors/:path*", "/products/:path*", "/alerts/:path*"] };
