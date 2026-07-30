import { Construction } from "lucide-react";
import { notFound } from "next/navigation";

const sections: Record<string, { title: string; description: string; milestone: string }> = {
  categories: { title: "Categorias", description: "Compare atividade e crescimento por categoria pública.", milestone: "Etapa 3" },
  videos: { title: "Vídeos", description: "Acompanhe publicações públicas associadas aos concorrentes.", milestone: "Etapa 3" },
  trends: { title: "Tendências", description: "Identifique aceleração e mudanças de comportamento.", milestone: "Etapa 3" },
  reports: { title: "Relatórios", description: "Resumos baseados exclusivamente nos dados armazenados.", milestone: "Etapa 3" },
  comparisons: { title: "Comparações", description: "Análise lado a lado de concorrentes e produtos.", milestone: "Etapa 3" },
  integrations: { title: "Integrações", description: "Webhooks e canais externos com configuração explícita.", milestone: "Etapa 4" },
  subscription: { title: "Assinatura", description: "Limites configuráveis sem cobrança real nesta versão.", milestone: "Etapa 4" },
  settings: { title: "Configurações", description: "Preferências do workspace, alertas e privacidade.", milestone: "Etapa 2" },
};

export default async function PlannedSection({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const content = sections[section];
  if (!content) notFound();

  return (
    <div>
      <p className="eyebrow">Roadmap VivaData</p>
      <h1 className="mt-1 text-3xl font-bold">{content.title}</h1>
      <p className="muted mt-2">{content.description}</p>
      <div className="card mt-8 grid min-h-80 place-items-center text-center">
        <div><Construction className="mx-auto mb-4 text-cyan-300" size={42}/><h2 className="text-lg font-bold">Planejado para a {content.milestone}</h2><p className="muted mx-auto mt-2 max-w-md">A navegação está disponível para comunicar o roadmap. Nenhum dado ou automação fictícia é apresentado como funcional.</p></div>
      </div>
    </div>
  );
}
