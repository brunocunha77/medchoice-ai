import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, GitCompare, Star, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCourseById } from "@/lib/aiCompare";
import type { Course } from "@/lib/types";

export const Route = createFileRoute("/curso/$id")({
  loader: ({ params }): { course: Course } => {
    const course = getCourseById(params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.course.name} — MedCompare` : "Curso — MedCompare" },
      { name: "description", content: loaderData?.course.description ?? "Detalhes do curso médico." },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Curso não encontrado</h1>
      <Button asChild className="mt-6"><Link to="/comparar">Voltar para comparações</Link></Button>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData() as { course: Course };


  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground sm:p-12">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">{course.category}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-5xl text-balance">{course.name}</h1>
        <p className="mt-3 text-primary-foreground/80">{course.provider}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> {course.rating} ({course.reviews} avaliações)</span>
          <span className="flex items-center gap-1.5"><span className="rounded bg-white/10 px-2 py-0.5">Nota {course.final_score}</span></span>
          {course.badge && <Badge className="bg-medical text-medical-foreground border-0">{course.badge}</Badge>}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <Section title="Descrição">
            <p className="text-muted-foreground">{course.description}</p>
          </Section>

          {course.conteudo && (
            <Section title="Conteúdo programático">
              <ul className="grid gap-2 sm:grid-cols-2">
                {course.conteudo.map((c) => (
                  <li key={c} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
                    <Check className="h-4 w-4 text-medical" /> {c}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Section title="Pontos fortes">
              <ul className="space-y-2">
                {course.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-medical" /> {s}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Pontos de atenção">
              <ul className="space-y-2">
                {course.weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" /> {w}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <Section title="Avaliações dos alunos">
            <p className="text-sm text-muted-foreground">Avaliações verificadas em breve.</p>
          </Section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-display text-3xl font-semibold">{course.price}</p>
            {course.installments && <p className="text-sm text-muted-foreground">{course.installments}</p>}

            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Modalidade" value={course.modalidade} />
              {course.carga_horaria && <Row label="Carga horária" value={course.carga_horaria} />}
              {course.publico_alvo && <Row label="Público-alvo" value={course.publico_alvo} />}
              <Row label="Certificado" value={course.features.certificado ? "Sim" : "Não"} />
              {course.updated_at && <Row label="Atualizado em" value={course.updated_at} />}
            </dl>

            <Button asChild className="mt-6 w-full bg-primary hover:bg-primary/90">
              <a href={course.cta_url} target="_blank" rel="noreferrer">
                Ir para o site do curso <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link to="/comparar" search={{ query: `Compare ${course.name} com outros cursos de ${course.category}` }}>
                <GitCompare className="mr-1 h-4 w-4" /> Comparar com outro curso
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
