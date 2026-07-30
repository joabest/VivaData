import type { Prisma } from "@prisma/client";
import { Store } from "lucide-react";
import { redirect } from "next/navigation";

import { addCompetitor } from "@/app/actions";
import { auth } from "@/auth";
import { EntityForm } from "@/components/entity-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CompetitorRow = Prisma.CompetitorGetPayload<{
  include: { _count: { select: { products: true; videos: true; creators: true } } };
}>;

export default async function Competitors() {
  const session = await auth();
  if (!session?.user.id) redirect("/login");

  const rows: CompetitorRow[] = await prisma.competitor.findMany({
    where: { userId: session.user.id },
    include: { _count: { select: { products: true, videos: true, creators: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Monitoramento</p><h1 className="mt-1 text-3xl font-bold">Concorrentes</h1><p className="muted mt-1">Monitore até 20 lojas e perfis públicos.</p></div>
        <EntityForm title="Adicionar concorrente" action={addCompetitor}>
          <label className="text-sm font-medium">Nome<input className="input mt-1" name="name" required /></label>
          <label className="text-sm font-medium">URL da TikTok Shop<input className="input mt-1" name="shopUrl" type="url" required placeholder="https://shop.tiktok.com/..." /></label>
          <label className="text-sm font-medium">Categoria<input className="input mt-1" name="category" /></label>
        </EntityForm>
      </div>
      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-white/[.035] text-[10px] uppercase tracking-wider text-slate-500"><tr>{["Loja", "Categoria", "Produtos", "Vídeos", "Criadores", "Última coleta", "Status"].map((heading) => <th className="px-5 py-4" key={heading}>{heading}</th>)}</tr></thead>
          <tbody>{rows.map((row: CompetitorRow) => <tr className="border-t border-white/[.06]" key={row.id}><td className="px-5 py-4 font-semibold">{row.name}</td><td className="px-5 py-4 text-slate-400">{row.category ?? "—"}</td><td className="px-5 py-4">{row._count.products}</td><td className="px-5 py-4">{row._count.videos}</td><td className="px-5 py-4">{row._count.creators}</td><td className="px-5 py-4 text-slate-400">{row.lastCollectedAt?.toLocaleString("pt-BR") ?? "Aguardando"}</td><td className="px-5 py-4"><span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold text-cyan-300">{row.status}</span></td></tr>)}</tbody>
        </table>
        {rows.length === 0 && <div className="grid place-items-center p-14 text-center"><Store className="mb-3 text-slate-700" size={38}/><h2 className="font-bold">Nenhum concorrente ainda</h2><p className="muted">Adicione uma URL pública para começar.</p></div>}
      </div>
    </>
  );
}
