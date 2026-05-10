import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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

const OPENAI_MODEL = "gpt-5.5";
const WEB_SEARCH_TIMEOUT_MS = 25000;
const FALLBACK_AI_TIMEOUT_MS = 18000;

const comparisonJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "query",
    "summary",
    "best_overall",
    "best_cost_benefit",
    "best_for_beginners",
    "courses",
    "recommendation",
    "warnings",
  ],
  properties: {
    query: { type: "string" },
    summary: { type: "string" },
    best_overall: { type: "string" },
    best_cost_benefit: { type: "string" },
    best_for_beginners: { type: "string" },
    recommendation: { type: "string" },
    warnings: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 5,
    },
    courses: {
      type: "array",
      minItems: 3,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "name",
          "provider",
          "category",
          "price",
          "price_value",
          "installments",
          "modalidade",
          "carga_horaria",
          "rating",
          "reviews",
          "best_for",
          "badge",
          "strengths",
          "weaknesses",
          "features",
          "final_score",
          "cta_url",
          "description",
          "professor",
          "publico_alvo",
          "conteudo",
          "updated_at",
        ],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          provider: { type: "string" },
          category: { type: "string" },
          price: { type: "string" },
          price_value: { type: "number" },
          installments: { type: "string" },
          modalidade: { type: "string", enum: ["Online", "Ao vivo", "Híbrido", "Presencial"] },
          carga_horaria: { type: "string" },
          rating: { type: "number", minimum: 0, maximum: 5 },
          reviews: { type: "number", minimum: 0 },
          best_for: { type: "string" },
          badge: {
            type: "string",
            enum: ["Mais completo", "Melhor custo-benefício", "Melhor para iniciantes", "Melhor banco de questões"],
          },
          strengths: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 5 },
          weaknesses: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 4 },
          features: {
            type: "object",
            additionalProperties: false,
            required: ["question_bank", "simulados", "mentoria", "certificado", "aulas_ao_vivo"],
            properties: {
              question_bank: { type: "boolean" },
              simulados: { type: "boolean" },
              mentoria: { type: "boolean" },
              certificado: { type: "boolean" },
              aulas_ao_vivo: { type: "boolean" },
            },
          },
          final_score: { type: "number", minimum: 0, maximum: 100 },
          cta_url: { type: "string" },
          description: { type: "string" },
          professor: { type: "string" },
          publico_alvo: { type: "string" },
          conteudo: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 8 },
          updated_at: { type: "string" },
        },
      },
    },
  },
};

type OpenAITextContent = {
  type?: string;
  text?: string;
};

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: OpenAITextContent[];
  }>;
  error?: {
    message?: string;
  };
};

function getOpenAIKey() {
  return import.meta.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
}

function formatOpenAIError(message?: string) {
  const fallback = "Não foi possível gerar a comparação com IA agora.";
  if (!message) return fallback;

  if (message.toLowerCase().includes("quota")) {
    return "A chave da OpenAI está sem cota/crédito disponível. Verifique o plano e o billing da conta.";
  }

  if (message.toLowerCase().includes("incorrect api key") || message.toLowerCase().includes("invalid api key")) {
    return "A chave da OpenAI configurada no servidor é inválida.";
  }

  return message;
}

function extractOutputText(response: OpenAIResponse): string | undefined {
  if (response.output_text) return response.output_text;

  return response.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .find((text): text is string => Boolean(text));
}

function fallbackComparison(query: string, reason: string): ComparisonResult {
  const courses = [...MOCK_COURSES].sort((a, b) => b.final_score - a.final_score);

  return {
    query,
    summary:
      "Não consegui concluir a busca online agora, então organizei uma comparação rápida com a base inicial de cursos cadastrados.",
    best_overall: courses[0].name,
    best_cost_benefit: courses.find((c) => c.badge === "Melhor custo-benefício")?.name ?? courses[1].name,
    best_for_beginners: courses.find((c) => c.badge === "Melhor para iniciantes")?.name ?? courses[courses.length - 1].name,
    courses,
    recommendation:
      "Use este resultado como ponto de partida e confirme preço, turma, certificado e bônus no site oficial de cada curso antes de decidir.",
    warnings: [reason, ...WARNINGS],
  };
}

async function requestOpenAIComparison({
  apiKey,
  query,
  useWebSearch,
  timeoutMs,
}: {
  apiKey: string;
  query: string;
  useWebSearch: boolean;
  timeoutMs: number;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        reasoning: { effort: "low" },
        ...(useWebSearch
          ? {
              tools: [
                {
                  type: "web_search",
                  search_context_size: "low",
                  user_location: {
                    type: "approximate",
                    country: "BR",
                    timezone: "America/Sao_Paulo",
                  },
                },
              ],
              tool_choice: "auto",
            }
          : {}),
        text: {
          format: {
            type: "json_schema",
            name: "course_comparison",
            strict: true,
            schema: comparisonJsonSchema,
          },
        },
        input: [
          {
            role: "system",
            content: useWebSearch
              ? "Voce e um comparador de cursos medicos para o mercado brasileiro. Faca no maximo uma busca objetiva na web e responda somente com JSON valido no schema solicitado. Priorize sites oficiais e paginas de venda recentes. Quando um dado nao estiver claro, use estimativa conservadora e sinalize nas observacoes. Nao invente links oficiais."
              : "Voce e um comparador de cursos medicos para o mercado brasileiro. Responda somente com JSON valido no schema solicitado. Use conhecimento geral e estimativas conservadoras, sinalizando que os dados devem ser confirmados nos sites oficiais.",
          },
          {
            role: "user",
            content: `Compare cursos medicos para esta busca do usuario: ${query}`,
          },
        ],
      }),
    });

    const payload = (await response.json()) as OpenAIResponse;
    if (!response.ok) {
      throw new Error(formatOpenAIError(payload.error?.message));
    }

    const outputText = extractOutputText(payload);
    if (!outputText) {
      throw new Error("A OpenAI não retornou um texto estruturado.");
    }

    return JSON.parse(outputText) as ComparisonResult;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        useWebSearch
          ? "A busca online demorou demais para responder."
          : "A geração da comparação demorou demais para responder.",
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

const compareCoursesOnServer = createServerFn({ method: "POST" })
  .inputValidator(z.object({ query: z.string().trim().min(1) }))
  .handler(async ({ data }): Promise<ComparisonResult> => {
    const apiKey = getOpenAIKey();
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY não configurada no servidor.");
    }

    try {
      return await requestOpenAIComparison({
        apiKey,
        query: data.query,
        useWebSearch: true,
        timeoutMs: WEB_SEARCH_TIMEOUT_MS,
      });
    } catch (webError) {
      try {
        const result = await requestOpenAIComparison({
          apiKey,
          query: data.query,
          useWebSearch: false,
          timeoutMs: FALLBACK_AI_TIMEOUT_MS,
        });

        return {
          ...result,
          warnings: [
            "A busca online demorou demais; este resultado foi gerado sem consulta web em tempo real.",
            ...(result.warnings ?? WARNINGS),
          ],
        };
      } catch (fallbackError) {
        const reason = fallbackError instanceof Error ? fallbackError.message : "A OpenAI não respondeu a tempo.";
        const webReason = webError instanceof Error ? webError.message : "A busca online falhou.";
        return fallbackComparison(data.query, `${webReason} ${reason}`);
      }
    }
  });

export async function compareCoursesWithAI(query: string): Promise<ComparisonResult> {
  return compareCoursesOnServer({ data: { query } });
}

export function getCourseById(id: string): Course | undefined {
  return MOCK_COURSES.find((c) => c.id === id);
}
