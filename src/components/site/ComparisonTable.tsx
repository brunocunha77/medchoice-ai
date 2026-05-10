import { Check, X } from "lucide-react";
import type { Course } from "@/lib/types";

export function ComparisonTable({ courses }: { courses: Course[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Curso</th>
            <th className="px-4 py-3 font-medium">Melhor para</th>
            <th className="px-4 py-3 font-medium">Preço</th>
            <th className="px-4 py-3 font-medium">Modalidade</th>
            <th className="px-4 py-3 text-center font-medium">Banco</th>
            <th className="px-4 py-3 text-center font-medium">Simulados</th>
            <th className="px-4 py-3 text-center font-medium">Mentoria</th>
            <th className="px-4 py-3 font-medium">Avaliação</th>
            <th className="px-4 py-3 text-center font-medium">Cert.</th>
            <th className="px-4 py-3 text-right font-medium">Nota</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/30">
              <td className="px-4 py-3">
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.provider}</div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{c.best_for}</td>
              <td className="px-4 py-3 font-medium">{c.price}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.modalidade}</td>
              <td className="px-4 py-3 text-center"><Cell on={c.features.question_bank} /></td>
              <td className="px-4 py-3 text-center"><Cell on={c.features.simulados} /></td>
              <td className="px-4 py-3 text-center"><Cell on={c.features.mentoria} /></td>
              <td className="px-4 py-3">{c.rating} ★ <span className="text-xs text-muted-foreground">({c.reviews})</span></td>
              <td className="px-4 py-3 text-center"><Cell on={c.features.certificado} /></td>
              <td className="px-4 py-3 text-right">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 font-display text-sm font-semibold text-primary">{c.final_score}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell({ on }: { on: boolean }) {
  return on ? (
    <Check className="mx-auto h-4 w-4 text-medical" />
  ) : (
    <X className="mx-auto h-4 w-4 text-muted-foreground/40" />
  );
}
