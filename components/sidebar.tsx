"use client";

import {
  BarChart3,
  Bell,
  Boxes,
  ChevronLeft,
  CreditCard,
  FileBarChart,
  GitCompareArrows,
  LayoutDashboard,
  LogOut,
  Menu,
  Plug,
  Radio,
  Settings,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "./theme-toggle";

const groups = [
  {
    label: "Análise",
    links: [
      ["/dashboard", "Dashboard", LayoutDashboard],
      ["/competitors", "Concorrentes", Store],
      ["/products", "Produtos", Boxes],
      ["/categories", "Categorias", BarChart3],
      ["/creators", "Criadores", Users],
      ["/videos", "Vídeos", Video],
      ["/lives", "Lives", Radio],
      ["/trends", "Tendências", TrendingUp],
    ],
  },
  {
    label: "Workspace",
    links: [
      ["/alerts", "Alertas", Bell],
      ["/reports", "Relatórios", FileBarChart],
      ["/comparisons", "Comparações", GitCompareArrows],
      ["/integrations", "Integrações", Plug],
      ["/subscription", "Assinatura", CreditCard],
      ["/settings", "Configurações", Settings],
    ],
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navigation = (
    <aside className={`sidebar-surface flex h-full flex-col ${collapsed ? "w-[82px]" : "w-[260px]"}`}>
      <div className="flex h-20 items-center justify-between px-5">
        <Link href="/dashboard" className="flex items-center gap-3 font-display text-xl font-bold">
          <span className="logo-mark"><Sparkles size={19} /></span>
          {!collapsed && <span>VivaData</span>}
        </Link>
        <button className="icon-button hidden lg:grid" onClick={() => setCollapsed((value) => !value)} aria-label="Recolher navegação">
          <ChevronLeft size={16} className={collapsed ? "rotate-180" : ""} />
        </button>
      </div>
      <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed && <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">{group.label}</p>}
            <div className="space-y-1">
              {group.links.map(([href, label, Icon]) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link key={href} href={href} title={collapsed ? label : undefined} onClick={() => setOpen(false)} className={`nav-link ${active ? "nav-link-active" : ""}`}>
                    <Icon size={18} />{!collapsed && <span>{label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="space-y-3 p-3">
        {!collapsed && <div className="upgrade-card"><Zap size={19}/><strong>Desbloqueie mais insights</strong><p>Automação e relatórios avançados estão no roadmap.</p><Link href="/subscription">Ver roadmap</Link></div>}
        <div className="flex items-center justify-between rounded-xl border border-white/10 p-2">
          {!collapsed && <div className="flex min-w-0 items-center gap-2"><span className="avatar">VD</span><div className="min-w-0"><p className="truncate text-xs font-semibold">Conta VivaData</p><p className="text-[10px] text-slate-500">Plano gratuito</p></div></div>}
          <ThemeToggle />
        </div>
        <button onClick={() => signOut({ redirectTo: "/login" })} className="nav-link w-full text-rose-400"><LogOut size={17}/>{!collapsed && "Sair"}</button>
      </div>
    </aside>
  );

  return <><button className="icon-button fixed left-4 top-5 z-40 lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu/></button><div className="hidden h-screen shrink-0 lg:block">{navigation}</div>{open && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Fechar menu"/><div className="relative h-full w-[280px]">{navigation}<button className="icon-button absolute right-3 top-5" onClick={() => setOpen(false)}><X/></button></div></div>}</>;
}
