import { createFileRoute } from "@tanstack/react-router";
import {
  Stethoscope, Activity, BookOpen, Brain, GraduationCap, HeartPulse,
  Microscope, Radio, ScanLine, Target,
} from "lucide-react";
import { CategoryCard } from "@/components/site/CategoryCard";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias de cursos médicos — MedCompare" },
      { name: "description", content: "Explore categorias de cursos: residência, Revalida, R+, ECG, ultrassom, mentorias e mais." },
    ],
  }),
  component: CategoriesPage,
});

const ALL = [
  { icon: Stethoscope, title: "Residência Médica", description: "Extensivos, intensivos e revisões.", query: "Melhores cursos para residência médica" },
  { icon: GraduationCap, title: "Revalida", description: "Cursos focados no INEP.", query: "Melhor curso de Revalida" },
  { icon: Target, title: "R+", description: "Acesso direto e áreas de atuação.", query: "Melhor curso para R+" },
  { icon: Activity, title: "ECG e Emergência", description: "Cursos práticos para plantão.", query: "Melhor curso de ECG" },
  { icon: ScanLine, title: "Ultrassom POCUS", description: "Point-of-care ultrasound.", query: "Curso de ultrassom point-of-care" },
  { icon: HeartPulse, title: "Cursos Práticos", description: "Procedimentos e habilidades.", query: "Cursos práticos para médicos" },
  { icon: BookOpen, title: "Pós-graduação", description: "Lato sensu e extensão.", query: "Melhores pós-graduações médicas" },
  { icon: Microscope, title: "Banco de Questões", description: "Questões comentadas.", query: "Melhor banco de questões" },
  { icon: Brain, title: "Mentorias", description: "Acompanhamento individual.", query: "Melhores mentorias médicas" },
  { icon: Radio, title: "Atualização", description: "Atualização contínua.", query: "Cursos de atualização médica" },
];

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Categorias</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Escolha uma categoria para ver comparações sugeridas pela nossa IA.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL.map((c) => <CategoryCard key={c.title} {...c} />)}
      </div>
    </div>
  );
}
