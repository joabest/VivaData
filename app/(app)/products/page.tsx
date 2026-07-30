import type { Competitor, Prisma } from "@prisma/client";
import { Boxes } from "lucide-react";
import { redirect } from "next/navigation";

import { addProduct } from "@/app/actions";
import { auth } from "@/auth";
import { EntityForm } from "@/components/entity-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
type ProductRow = Prisma.ProductGetPayload<{ include: { competitor: true } }>;

export default async function Products() {
  const session = await auth();
  if (!session?.user.id) redirect("/login");
  const [competitors, products]: [Competitor[], ProductRow[]] = await Promise.all([
    prisma.competitor.findMany({ where: { userId: session.user.id } }),
    prisma.product.findMany({ where: { competitor: { userId: session.user.id } }, include: { competitor: true }, orderBy: { updatedAt: "desc" } }),
  ]);

  return <><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Catálogo monitorado</p><h1 className="mt-1 text-3xl font-bold">Produtos</h1><p className="muted mt-1">Preços, avaliações e sinais públicos de crescimento.</p></div><EntityForm title="Cadastrar produto" action={addProduct}><label className="text-sm font-medium">Concorrente<select className="input mt-1" name="competitorId" required>{competitors.map((competitor: Competitor) => <option value={competitor.id} key={competitor.id}>{competitor.name}</option>)}</select></label><label className="text-sm font-medium">Nome<input className="input mt-1" name="name" required /></label><label className="text-sm font-medium">URL pública<input className="input mt-1" name="url" type="url" required /></label><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Preço (R$)<input className="input mt-1" name="currentPrice" type="number" step=".01" required /></label><label className="text-sm font-medium">Avaliações<input className="input mt-1" name="reviewCount" type="number" required /></label></div></EntityForm></div><div className="card overflow-x-auto p-0"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-white/[.035] text-[10px] uppercase tracking-wider text-slate-500"><tr>{["Produto", "Loja", "Preço atual", "Nota", "Avaliações", "Disponibilidade", "Atualização"].map((heading) => <th className="px-5 py-4" key={heading}>{heading}</th>)}</tr></thead><tbody>{products.map((product: ProductRow) => <tr className="border-t border-white/[.06]" key={product.id}><td className="px-5 py-4 font-semibold">{product.name}</td><td className="px-5 py-4 text-slate-400">{product.competitor.name}</td><td className="px-5 py-4">{Number(product.currentPrice).toLocaleString("pt-BR", { style: "currency", currency: product.currency })}</td><td className="px-5 py-4">{product.rating?.toString() ?? "Não disponível"}</td><td className="px-5 py-4">{product.reviewCount}</td><td className="px-5 py-4 text-cyan-300">{product.availability}</td><td className="px-5 py-4 text-slate-400">{product.updatedAt.toLocaleDateString("pt-BR")}</td></tr>)}</tbody></table>{products.length === 0 && <div className="grid place-items-center p-14 text-center"><Boxes className="mb-3 text-slate-700" size={38}/><h2 className="font-bold">Nenhum produto monitorado</h2><p className="muted">Cadastre um produto público para testar os históricos.</p></div>}</div></>;
}
