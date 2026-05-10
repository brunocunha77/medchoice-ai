import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Stethoscope, Activity, BookOpen, Brain, GraduationCap, HeartPulse,
  Microscope, Radio, ScanLine, Sparkles, Target, ShieldCheck, TrendingUp
} from "lucide-react";
import { SearchInput } from "@/components/site/SearchInput";
import { CategoryCard } from "@/components/site/CategoryCard";
import { CourseCard } from "@/components/site/CourseCard";
import { ComparisonTable } from "@/components/site/ComparisonTable";
import { AIResultSummary } from "@/components/site/AIResultSummary";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES } from "@/lib/aiCompare";
import type { ComparisonResult } from "@/lib/types";

export const Route = createFileRoute("/")({
  component: Home,
});

const SUGGESTIONS = [
  "Medway ou Estratégia MED?",
  "Melhor curso de ECG para médicos",
  "Cursos para Revalida com banco de questões",
  "Curso de emergência para plantão",
  "Melhor curso para R+ em clínica médica",
];

const CATEGORIES = [
  { icon: Stethoscope, title: "Residência Médica", description: "Extensivos, intensivos e revisões para os principais editais.", query: "Melhores cursos para residência médica 2026" },
  { icon: GraduationCap, title: "Revalida", description: "Cursos com banco de questões e simulados focados no INEP.", query: "Melhor curso de Revalida com banco de questões" },
  { icon: Target, title: "R+", description: "Preparação para acesso direto e provas de áreas de atuação.", query: "Melhor curso para R+ em clínica médica" },
  { icon: Activity, title: "ECG e Emergência", description: "Cursos práticos para plantão e atendimento agudo.", query: "Melhor curso de ECG para médicos recém-formados" },
  { icon: ScanLine, title: "Ultrassom POCUS", description: "Point-of-care ultrasound aplicado à prática clínica.", query: "Curso de ultrassom point-of-care até R$ 2.000" },
  { icon: HeartPulse, title: "Cursos Práticos", description: "Procedimentos, vias aéreas, suturas e habilidades clínicas.", query: "Melhores cursos práticos para médicos" },
  { icon: BookOpen, title: "Pós-graduação", description: "Lato sensu e extensão em diversas áreas.", query: "Melhores pós-graduações para médicos" },
  { icon: Microscope, title: "Banco de Questões", description: "Plataformas com questões comentadas e simulados.", query: "Melhor banco de questões para residência" },
  { icon: Brain, title: "Mentorias", description: "Mentorias individuais e em grupo para concursos médicos.", query: "Melhor mentoria para residência médica" },
  { icon: Radio, title: "Atualização", description: "Conteúdo contínuo para manter-se atualizado.", query: "Melhores cursos de atualização médica" },
];

const POPULAR = [
  "Medway vs Estratégia MED",
  "Melhor curso para ENARE",
  "Melhor banco de questões para residência",
  "Melhor curso de ECG para plantonistas",
  "Melhor curso para Revalida",
  "Melhor mentoria para residência médica",
  "Curso de emergência para médico recém-formado",
];

function Home() {
  const sample: ComparisonResult = {
    query: "Compare cursos para residência médica em clínica médica",
    summary: "Selecionamos os 4 cursos mais relevantes do mercado, com base em banco de questões, simulados, mentoria, atualização e custo-benefício.",
    best_overall: MOCK_COURSES[0].name,
    best_cost_benefit: "Hardwork Medicina",
    best_for_beginners: "Sanar Residência",
    courses: MOCK_COURSES,
    recommendation: "Para preparação completa, Medway lidera. Para custo-benefício, Hardwork. Iniciantes se adaptam melhor ao Sanar.",
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-medical/30 bg-medical/5 px-3 py-1 text-xs font-medium text-medical">
            <Sparkles className="h-3.5 w-3.5" /> Comparação inteligente para a comunidade médica
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-6xl">
            Compare cursos médicos<br />
            <span className="text-medical">antes de comprar.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Pergunte como se estivesse falando com uma IA. Nós organizamos as melhores opções por preço, avaliações, professores, certificado e custo-benefício.
          </p>

          <div className="mx-auto mt-10 max-w-3xl">
            <SearchInput suggestions={SUGGESTIONS} />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-medical" /> Avaliações verificadas</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-medical" /> +200 cursos comparados</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-medical" /> Análise por IA</span>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-medical">Como funciona</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Três passos para uma decisão melhor</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Você pergunta", d: "Digite exatamente o que deseja comparar, como faria em uma conversa com uma IA." },
            { n: "02", t: "A IA organiza", d: "A plataforma busca, analisa e estrutura as opções com critérios objetivos." },
            { n: "03", t: "Você decide", d: "Compare preço, professores, avaliações, certificado, bônus e benefícios antes de comprar." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-display text-3xl font-semibold text-medical/40">{s.n}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="border-y border-border bg-surface/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-medical">Categorias</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Para todo momento da carreira</h2>
            </div>
            <Link to="/categorias" className="hidden text-sm text-medical hover:underline sm:block">Ver todas →</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => <CategoryCard key={c.title} {...c} />)}
          </div>
        </div>
      </section>

      {/* RESULTADO SIMULADO */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-medical">Veja em ação</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Assim ficam os resultados</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Cada busca gera um resumo, ranking, tabela comparativa e recomendação final orientada ao seu perfil.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <AIResultSummary result={sample} />

          <div>
            <h3 className="mb-4 font-display text-xl font-semibold">Ranking</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {sample.courses.map((c, i) => <CourseCard key={c.id} course={c} rank={i + 1} />)}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xl font-semibold">Tabela comparativa</h3>
            <ComparisonTable courses={sample.courses} />
          </div>
        </div>
      </section>

      {/* COMPARAÇÕES POPULARES */}
      <section className="border-t border-border bg-surface/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-medical">Em alta</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Comparações populares</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {POPULAR.map((q) => (
              <Link key={q} to="/comparar" search={{ query: q }} className="rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:border-medical hover:text-medical">
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground sm:p-16">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl text-balance">
            Evite comprar curso no impulso. Compare antes de investir milhares de reais.
          </h2>
          <p className="mt-3 max-w-xl text-primary-foreground/70">
            Dados organizados, pontos fortes e fracos, melhor indicação para cada perfil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-medical text-medical-foreground hover:bg-medical/90">
              <Link to="/comparar">Comparar agora</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/categorias">Ver categorias</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
