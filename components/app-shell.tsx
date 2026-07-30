import { Bell, CircleHelp, Search } from "lucide-react";

import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-app">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center border-b border-white/[.07] bg-[#07090d]/85 px-5 pl-16 backdrop-blur-xl lg:px-8">
          <div className="relative mx-auto hidden w-full max-w-lg md:block">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={17}/>
            <input className="search-input" placeholder="Buscar concorrentes, produtos ou criadores..." aria-label="Busca global" />
            <kbd className="absolute right-3 top-2.5 text-[10px] text-slate-500">⌘ K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="icon-button" aria-label="Ajuda"><CircleHelp size={18}/></button>
            <button className="icon-button relative" aria-label="Notificações"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500"/></button>
            <span className="avatar ml-1">VD</span>
          </div>
        </header>
        <div className="mx-auto max-w-[1680px] p-4 md:p-6 xl:p-8">{children}</div>
      </main>
    </div>
  );
}
