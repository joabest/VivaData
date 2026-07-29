import type { Config } from "tailwindcss";
export default { darkMode: "class", content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#111827", brand: { DEFAULT: "#6d5dfc", dark: "#5546e8" } }, boxShadow: { soft: "0 12px 40px rgba(17,24,39,.06)" } } }, plugins: [] } satisfies Config;
