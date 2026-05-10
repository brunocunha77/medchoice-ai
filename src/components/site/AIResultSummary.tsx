import { Sparkles, Trophy, Wallet, GraduationCap } from "lucide-react";
import type { ComparisonResult } from "@/lib/types";

export function AIResultSummary({ result }: { result: ComparisonResult }) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/30 p-6">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-medical">
        <Sparkles className="h-3.5 w-3.5" />
        Resumo gerado por IA
      </div>
      <h2 className="mt-3 font-display text-2xl font-semibold text-balance">
        {result.query}
      </h2>
      <p className="mt-3 text-muted-foreground">{result.summary}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Highlight icon={Trophy} label="Melhor geral" value={result.best_overall} />
        <Highlight icon={Wallet} label="Melhor custo-benefício" value={result.best_cost_benefit} />
        <Highlight icon={GraduationCap} label="Melhor para iniciantes" value={result.best_for_beginners} />
      </div>

      <div className="mt-6 rounded-xl border border-medical/30 bg-medical/5 p-4 text-sm">
        <span className="font-medium text-foreground">Recomendação final: </span>
        <span className="text-muted-foreground">{result.recommendation}</span>
      </div>
    </div>
  );
}

function Highlight({ icon: Icon, label, value }: { icon: typeof Trophy; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 font-display text-base font-semibold leading-tight">{value}</p>
    </div>
  );
}
