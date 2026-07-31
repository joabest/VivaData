const withoutTrailingSlash = (url: string) => url.replace(/\/$/, "");

/**
 * Returns the canonical application origin for server-side absolute URLs.
 * Internal navigation should continue to use relative paths.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return withoutTrailingSlash(process.env.NEXT_PUBLIC_APP_URL);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${withoutTrailingSlash(process.env.VERCEL_PROJECT_PRODUCTION_URL)}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${withoutTrailingSlash(process.env.VERCEL_URL)}`;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  throw new Error(
    "Application URL is not configured. Set NEXT_PUBLIC_APP_URL in production.",
  );
}
