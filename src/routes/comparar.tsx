import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { AlertTriangle, History } from "lucide-react";
import { SearchInput } from "@/components/site/SearchInput";
import { LoadingComparison } from "@/components/site/LoadingComparison";
import { AIResultSummary } from "@/components/site/AIResultSummary";
import { CourseCard } from "@/components/site/CourseCard";
import { ComparisonTable } from "@/components/site/ComparisonTable";
import { FilterSidebar } from "@/components/site/FilterSidebar";
import { compareCoursesWithAI } from "@/lib/aiCompare";
import type { ComparisonResult } from "@/lib/types";

const searchSchema = z.object({
  query: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/comparar")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Comparar cursos médicos — MedCompare" },
      { name: "description", content: "Receba uma comparação clara entre cursos médicos com IA." },
    ],
  }),
  component: ComparePage,
});

const RECENT = [
  "Medway vs Estratégia MED",
  "Melhor curso para Revalida",
  "Cursos de ECG para plantonistas",
  "Mentorias para residência",
];

function ComparePage() {
  const { query } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) { setResult(null); return; }
    let cancelled = false;
    setLoading(true); setError(null);
    compareCoursesWithAI(query)
      .then((r) => { if (!cancelled) setResult({ ...r, query }); })
      .catch((error) => {
        console.error(error);
        if (!cancelled) {
          setError(error instanceof Error ? error.message : "Não foi possível comparar agora. Tente novamente.");
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-3xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Comparar cursos médicos</h1>
        <p className="mt-2 text-muted-foreground">Pergunte em linguagem natural. A IA organiza as melhores opções para você.</p>
        <div className="mt-6"><SearchInput initialValue={query} /></div>
      </div>

      <div className="flex gap-8">
        <FilterSidebar />

        <div className="min-w-0 flex-1 space-y-8">
          {!query && !loading && !result && <EmptyState />}

          {loading && <LoadingComparison />}

          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm">
              <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
              <div>
                <p className="font-medium">Algo deu errado</p>
                <p className="text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <>
              <AIResultSummary result={result} />

              <section>
                <h2 className="mb-4 font-display text-xl font-semibold">Ranking dos cursos</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {result.courses.map((c, i) => <CourseCard key={c.id} course={c} rank={i + 1} />)}
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-display text-xl font-semibold">Tabela comparativa</h2>
                <ComparisonTable courses={result.courses} />
              </section>

              {result.warnings && result.warnings.length > 0 && (
                <div className="rounded-2xl border border-warning/40 bg-warning/5 p-5">
                  <p className="text-sm font-medium">Avisos importantes</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {result.warnings.map((w) => <li key={w}>• {w}</li>)}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-medical/10 text-medical">
        <History className="h-6 w-6" />
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold">Comece uma nova comparação</h2>
      <p className="mt-1 text-sm text-muted-foreground">Digite acima ou tente uma das comparações recentes:</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {RECENT.map((q) => (
          <a key={q} href={`/comparar?query=${encodeURIComponent(q)}`} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm hover:border-medical hover:text-medical">
            {q}
          </a>
        ))}
      </div>
    </div>
  );
}
