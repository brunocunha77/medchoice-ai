import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const STEPS = [
  "Analisando cursos médicos...",
  "Comparando preços, professores, avaliações e benefícios...",
  "Organizando recomendação final...",
];

export function LoadingComparison() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <div className="flex items-center gap-3">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-medical/10 text-medical">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </span>
        <div>
          <p className="font-display text-lg font-semibold">Comparando cursos</p>
          <p className="text-sm text-muted-foreground">{STEPS[step]}</p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-secondary/60" />
        ))}
      </div>
    </div>
  );
}
