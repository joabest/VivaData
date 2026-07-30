"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const demoActivity = [
  { day: "29 Abr", changes: 18, reviews: 34 },
  { day: "30 Abr", changes: 27, reviews: 52 },
  { day: "1 Mai", changes: 36, reviews: 61 },
  { day: "2 Mai", changes: 52, reviews: 89 },
  { day: "3 Mai", changes: 64, reviews: 102 },
  { day: "4 Mai", changes: 71, reviews: 116 },
  { day: "5 Mai", changes: 83, reviews: 131 },
];

export function ActivityChart() {
  return (
    <div className="h-72 w-full" aria-label="Gráfico demonstrativo de atividade competitiva">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={demoActivity} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,.06)" strokeDasharray="3 5" vertical={false}/>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }}/>
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }}/>
          <Tooltip contentStyle={{ background: "#11151d", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12 }} labelStyle={{ color: "#e2e8f0" }}/>
          <Line type="monotone" dataKey="reviews" name="Novas avaliações" stroke="#22d3ee" strokeWidth={2.5} dot={{ r: 3, fill: "#22d3ee" }}/>
          <Line type="monotone" dataKey="changes" name="Alterações" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3, fill: "#f43f5e" }}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
