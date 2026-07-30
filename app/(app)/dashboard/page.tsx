import { ArrowUp, Boxes, CalendarDays, CircleAlert, Eye, Filter, Sparkles, Store, Users } from "lucide-react";

import { ActivityChart } from "@/components/activity-chart";
import { ExportButton } from "@/components/export-button";

const metrics = [
  { label: "Concorrentes monitorados", value: "8", change: "+2 no período", icon: Store },
  { label: "Produtos monitorados", value: "164", change: "+12 novos", icon: Boxes },
  { label: "Produtos em alta", value: "23", change: "+14,8%", icon: ArrowUp },
  { label: "Novos criadores", value: "11", change: "+4 na semana", icon: Users },
] as const;

const categories = [
  ["Beleza", 82], ["Eletrônicos", 68], ["Casa", 54], ["Fitness", 41], ["Moda", 33],
] as const;

const products = [
  ["Sérum Facial Vitamina C", "Beleza Natural", "+34,7%", "1"],
  ["Ring Light Pro", "Tech Wave", "+28,1%", "2"],
  ["Organizador Modular", "Casa Prática", "+22,4%", "3"],
  ["Smartwatch Fit", "Fit Store", "+18,9%", "4"],
] as const;

const competitors = [
  ["Beleza Natural", "Beleza", "48", "4,8", "+24,8%", "Excelente"],
  ["Tech Wave", "Eletrônicos", "37", "4,7", "+18,3%", "Excelente"],
  ["Casa Prática", "Casa", "32", "4,6", "+12,7%", "Bom"],
  ["Fit Store", "Fitness", "25", "4,5", "-2,1%", "Atenção"],
] as const;

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Inteligência competitiva</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">Dashboard</h1>
          <p className="muted mt-2">Ações públicas que podem explicar o crescimento dos concorrentes.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="button-secondary"><CalendarDays size={16}/><span className="sr-only">Período</span><select className="bg-transparent outline-none"><option className="bg-slate-950">Últimos 7 dias</option><option className="bg-slate-950">Últimos 15 dias</option><option className="bg-slate-950">Últimos 30 dias</option></select></label>
          <a href="#concorrentes" className="button-secondary"><Filter size={16}/>Ver dados</a>
          <ExportButton />
        </div>
      </div>

      <div className="mt-6 flex gap-7 border-b border-white/[.08] text-sm">
        <button className="border-b-2 border-cyan-400 px-1 pb-3 font-semibold text-white">Visão geral</button>
        <a href="#produtos" className="pb-3 text-slate-500 hover:text-white">Produtos</a>
        <a href="#concorrentes" className="pb-3 text-slate-500 hover:text-white">Concorrentes</a>
        <a href="#atividade" className="pb-3 text-slate-500 hover:text-white">Atividade</a>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[.05] px-3 py-2 text-xs text-amber-200/80">
        <CircleAlert size={15}/><strong>Ambiente demonstrativo:</strong> os números desta visão são dados fictícios de seed, não vendas confirmadas.
      </div>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, change, icon: Icon }) => (
          <article className="card card-hover relative overflow-hidden" key={label}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-rose-500 opacity-60"/>
            <div className="flex items-start justify-between"><p className="muted">{label}</p><span className="rounded-xl border border-cyan-400/20 bg-cyan-400/[.07] p-2 text-cyan-300"><Icon size={19}/></span></div>
            <strong className="metric-value">{value}</strong>
            <p className="mt-2 text-xs font-semibold text-cyan-300">▲ {change}</p>
          </article>
        ))}
      </section>

      <section id="atividade" className="mt-4 grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <article className="card">
          <div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-bold">Performance competitiva</h2><p className="muted mt-1">Sinais públicos e alterações detectadas</p></div><div className="flex gap-4 text-xs"><span className="text-cyan-300">● Novas avaliações</span><span className="text-rose-400">● Alterações</span></div></div>
          <ActivityChart />
        </article>
        <article className="card">
          <div className="mb-6 flex items-center justify-between"><div><h2 className="font-bold">Categorias mais ativas</h2><p className="muted mt-1">Score demonstrativo de atividade</p></div><Sparkles size={18} className="text-rose-400"/></div>
          <div className="space-y-5">{categories.map(([name, score]) => <div key={name}><div className="mb-2 flex justify-between text-sm"><span>{name}</span><b>{score}%</b></div><div className="h-1.5 rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-rose-500" style={{width:`${score}%`}}/></div></div>)}</div>
        </article>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[.8fr_1.7fr]">
        <article id="produtos" className="card">
          <div className="mb-4 flex items-center justify-between"><div><h2 className="font-bold">Produtos em alta</h2><p className="muted">Crescimento de avaliações em 7 dias</p></div><Eye size={18} className="text-slate-500"/></div>
          <div className="space-y-1">{products.map(([name, shop, growth, rank]) => <div key={name} className="flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-white/[.035]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[.06] text-xs font-bold">{rank}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{name}</p><p className="text-xs text-slate-500">{shop}</p></div><b className="text-xs text-cyan-300">▲ {growth}</b></div>)}</div>
        </article>
        <article id="concorrentes" className="card overflow-hidden p-0">
          <div className="p-5"><h2 className="font-bold">Concorrentes analisados</h2><p className="muted mt-1">Resumo de dados públicos monitorados</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-white/[.035] text-[10px] uppercase tracking-wider text-slate-500"><tr>{["Concorrente","Categoria","Produtos","Nota","Crescimento","Status"].map((item)=><th className="px-5 py-3" key={item}>{item}</th>)}</tr></thead><tbody>{competitors.map(([name,category,count,rating,growth,status])=><tr className="border-t border-white/[.06]" key={name}><td className="px-5 py-4 font-semibold">{name}</td><td className="px-5 py-4 text-slate-400">{category}</td><td className="px-5 py-4">{count}</td><td className="px-5 py-4">★ {rating}</td><td className={`px-5 py-4 font-semibold ${growth.startsWith("-") ? "text-rose-400" : "text-cyan-300"}`}>{growth}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${status === "Atenção" ? "bg-rose-500/10 text-rose-400" : "bg-cyan-400/10 text-cyan-300"}`}>{status}</span></td></tr>)}</tbody></table></div>
        </article>
      </section>

      <article className="card mt-4 border-cyan-400/15 bg-gradient-to-r from-cyan-400/[.06] to-rose-500/[.04]">
        <div className="flex items-start gap-3"><span className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300"><Sparkles size={20}/></span><div><p className="eyebrow">Resumo automático demonstrativo</p><p className="mt-2 max-w-5xl text-sm leading-6 text-slate-300">Nos últimos sete dias, as lojas de demonstração lançaram <b>12 produtos</b>, reduziram preços de <b>19 itens</b>, publicaram <b>38 vídeos</b> e apareceram com <b>11 novos criadores</b>. Este texto usa apenas o conjunto fictício identificado acima.</p></div></div>
      </article>
    </>
  );
}
