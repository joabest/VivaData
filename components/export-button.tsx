"use client";

import { Download } from "lucide-react";

const safeCell = (value: string) => {
  const neutralized = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${neutralized.replaceAll('"', '""')}"`;
};

export function ExportButton() {
  function exportSummary() {
    const rows = [
      ["Métrica", "Valor", "Classificação"],
      ["Concorrentes monitorados", "8", "Dado demonstrativo"],
      ["Produtos monitorados", "164", "Dado demonstrativo"],
      ["Produtos em alta", "23", "Dado demonstrativo"],
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(safeCell).join(",")).join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "vivadata-resumo-demonstrativo.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return <button onClick={exportSummary} className="button"><Download size={16}/>Exportar CSV</button>;
}
