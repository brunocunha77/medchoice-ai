import type { ComparisonResult, Course } from "./types";

export const MOCK_COURSES: Course[] = [
  {
    id: "medway-extensivo",
    name: "Extensivo Residência Médica",
    provider: "Medway",
    category: "Residência Médica",
    price: "R$ 4.997",
    price_value: 4997,
    installments: "12x de R$ 416",
    modalidade: "Online",
    carga_horaria: "1.200h",
    rating: 4.8,
    reviews: 1284,
    best_for: "Quem quer preparação completa para os principais editais",
    badge: "Mais completo",
    strengths: ["Banco com +60 mil questões", "Simulados semanais", "Mentoria individual", "Material atualizado anualmente"],
    weaknesses: ["Preço mais alto", "Volume de conteúdo pode assustar iniciantes"],
    features: { question_bank: true, simulados: true, mentoria: true, certificado: true, aulas_ao_vivo: true },
    final_score: 94,
    cta_url: "#",
    description: "Curso extensivo com cronograma completo para os principais editais do país, incluindo USP, UNIFESP, ENARE e SUS-SP.",
    professor: "Equipe Medway",
    publico_alvo: "Estudantes do internato e médicos recém-formados",
    conteudo: ["Clínica Médica", "Cirurgia Geral", "Pediatria", "Ginecologia e Obstetrícia", "Medicina Preventiva"],
    updated_at: "2025-09-12",
  },
  {
    id: "estrategia-med",
    name: "Estratégia MED — Coruja Residência",
    provider: "Estratégia MED",
    category: "Residência Médica",
    price: "R$ 3.497",
    price_value: 3497,
    installments: "12x de R$ 291",
    modalidade: "Online",
    carga_horaria: "1.500h",
    rating: 4.7,
    reviews: 982,
    best_for: "Quem aprende melhor com PDFs estruturados e revisão por questões",
    badge: "Melhor banco de questões",
    strengths: ["Maior banco comentado do mercado", "PDFs altamente estruturados", "Plano de estudos personalizado"],
    weaknesses: ["Mentoria mais limitada", "Menos aulas ao vivo"],
    features: { question_bank: true, simulados: true, mentoria: false, certificado: true, aulas_ao_vivo: false },
    final_score: 90,
    cta_url: "#",
    description: "Plataforma com forte aposta em material escrito e revisão ativa por questões comentadas.",
    professor: "Corpo docente Estratégia",
    publico_alvo: "Estudantes que preferem estudo autodirigido",
    updated_at: "2025-08-30",
  },
  {
    id: "hardwork-medicina",
    name: "Revalida Extensivo",
    provider: "Hardwork Medicina",
    category: "Residência Médica",
    price: "R$ 2.997",
    price_value: 2997,
    installments: "12x de R$ 249",
    modalidade: "Híbrido",
    carga_horaria: "900h",
    rating: 4.9,
    reviews: 743,
    best_for: "Quem busca alto rendimento com método de revisão espaçada",
    badge: "Melhor custo-benefício",
    strengths: ["Método de revisão espaçada validado", "Comunidade ativa", "Bônus para Revalida e R+"],
    weaknesses: ["Curva de adaptação ao método", "Aulas ao vivo concentradas em São Paulo"],
    features: { question_bank: true, simulados: true, mentoria: true, certificado: true, aulas_ao_vivo: true },
    final_score: 92,
    cta_url: "#",
    description: "Método com forte ênfase em revisão espaçada, simulados e mentoria coletiva.",
    professor: "Dr. Jonathan Doenges e equipe",
    publico_alvo: "Médicos formados e revalidandos",
    updated_at: "2025-10-05",
  },
  {
    id: "sanar-residencia",
    name: "Sanar Residência",
    provider: "Sanar",
    category: "Residência Médica",
    price: "R$ 2.197",
    price_value: 2197,
    installments: "12x de R$ 183",
    modalidade: "Online",
    carga_horaria: "800h",
    rating: 4.5,
    reviews: 612,
    best_for: "Quem está começando e precisa de base sólida",
    badge: "Melhor para iniciantes",
    strengths: ["Linguagem didática", "Boa progressão para iniciantes", "Aplicativo mobile sólido"],
    weaknesses: ["Banco de questões menor", "Pouco aprofundamento em provas estaduais"],
    features: { question_bank: true, simulados: true, mentoria: false, certificado: true, aulas_ao_vivo: false },
    final_score: 84,
    cta_url: "#",
    description: "Curso voltado a quem está iniciando a preparação para residência médica.",
    publico_alvo: "Estudantes do 4º e 5º ano de medicina",
    updated_at: "2025-07-20",
  },
];

const WARNINGS = [
  "As informações podem mudar. Sempre confirme preço, certificado e condições no site oficial do curso.",
  "Este comparador não substitui orientação acadêmica ou profissional.",
  "Cursos de pós-graduação lato sensu não equivalem automaticamente a título de especialista.",
];

/**
 * Mock da chamada para a API de IA. Substitua por chamada real ao Claude
 * quando a API estiver disponível.
 */
export async function compareCoursesWithAI(query: string): Promise<ComparisonResult> {
  // simula latência
  await new Promise((r) => setTimeout(r, 1400));

  const courses = [...MOCK_COURSES].sort((a, b) => b.final_score - a.final_score);

  return {
    query,
    summary:
      "Analisamos cursos com foco em aprovação, banco de questões, simulados, mentoria e atualização do conteúdo. Abaixo, um ranking objetivo com a melhor opção para cada perfil.",
    best_overall: courses[0].name,
    best_cost_benefit: courses.find((c) => c.badge === "Melhor custo-benefício")?.name ?? courses[1].name,
    best_for_beginners: courses.find((c) => c.badge === "Melhor para iniciantes")?.name ?? courses[courses.length - 1].name,
    courses,
    recommendation:
      "Para preparação completa com mentoria, o curso da Medway lidera. Para custo-benefício, o Hardwork entrega excelente método por menos da metade do ticket. Iniciantes se adaptam melhor ao Sanar.",
    warnings: WARNINGS,
  };
}

export function getCourseById(id: string): Course | undefined {
  return MOCK_COURSES.find((c) => c.id === id);
}
