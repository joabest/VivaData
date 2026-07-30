"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export function ThemeToggle() { const { resolvedTheme, setTheme } = useTheme(); return <button aria-label="Alternar tema" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="rounded-xl border border-slate-200 p-2 dark:border-slate-700">{resolvedTheme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>; }
