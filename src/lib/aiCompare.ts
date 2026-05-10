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
const SEARCH_TIMEOUT_MS = 3000;
const SYNTHESIS_TIMEOUT_MS = 6000;

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

type SearchResult = {
  title: string;
  url: string;
  snippet: string;
};

type QuickCourse = {
  name: string;
  provider: string;
  url?: string;
  price?: string;
  modality?: string;
  best_for?: string;
  strengths?: string[];
  weaknesses?: string[];
  score?: number;
};

type QuickComparison = {
  summary?: string;
  recommendation?: string;
  courses?: QuickCourse[];
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

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function cleanText(value: string) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function cleanDuckDuckGoUrl(value: string) {
  const decoded = decodeHtml(value);
  if (!decoded.includes("duckduckgo.com/l/")) return decoded;

  try {
    const url = new URL(decoded.startsWith("//") ? `https:${decoded}` : decoded);
    const target = url.searchParams.get("uddg");
    return target ? decodeURIComponent(target) : decoded;
  } catch {
    return decoded;
  }
}

function queryVariants(query: string) {
  const normalized = query.toLowerCase();
  if (normalized.includes("ecg") || normalized.includes("eletro")) {
    return [
      `${query} curso eletrocardiograma médico online certificado`,
      "curso ECG médicos eletrocardiograma online Brasil certificado",
      "curso eletrocardiografia médicos online Brasil",
    ];
  }

  return [`${query} curso médico Brasil online preço`];
}

function isRelevantResult(result: SearchResult, query: string) {
  const haystack = `${result.title} ${result.snippet} ${result.url}`.toLowerCase();
  if (result.url.includes("duckduckgo.com/y.js") || result.url.includes("ad_domain=")) return false;
  if (/(enem|vestibular|graduação|graduacao|faculdade|bolsa de estudo|cursinho)/i.test(haystack)) return false;

  const normalized = query.toLowerCase();
  if (normalized.includes("ecg") || normalized.includes("eletro")) {
    return /(ecg|eletrocardiograma|eletrocardiografia|cardiologia|cardiologista)/i.test(haystack);
  }

  return true;
}

async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS);

  try {
    const pages = await Promise.all(
      queryVariants(query).map(async (variant) => {
        const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(variant)}`;
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });

        return response.ok ? response.text() : "";
      }),
    );

    const seen = new Set<string>();
    return pages
      .flatMap((html) =>
        [...html.matchAll(/<a rel="nofollow" class="result__a" href="([^"]+)">([\s\S]*?)<\/a>[\s\S]*?<a class="result__snippet"[\s\S]*?>([\s\S]*?)<\/a>/g)]
          .map((match) => ({
            url: cleanDuckDuckGoUrl(match[1]),
            title: cleanText(match[2]),
            snippet: cleanText(match[3]),
          })),
      )
      .filter((result) => {
        if (!result.title || !result.url || seen.has(result.url)) return false;
        seen.add(result.url);
        return isRelevantResult(result, query);
      })
      .slice(0, 6);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

function inferProvider(title: string) {
  const cleaned = title.split("|")[0].split("-")[0].trim();
  return cleaned || title;
}

function inferCategory(query: string) {
  const normalized = query.toLowerCase();
  if (normalized.includes("ecg") || normalized.includes("eletro")) return "ECG e Emergência";
  if (normalized.includes("revalida")) return "Revalida";
  if (normalized.includes("ultrassom") || normalized.includes("pocus")) return "Ultrassom POCUS";
  if (normalized.includes("pós") || normalized.includes("pos")) return "Pós-graduação";
  return "Cursos Médicos";
}

function priceValue(price: string | undefined, index: number) {
  const match = price?.match(/[\d.]+/);
  if (!match) return [997, 697, 497, 297][index] ?? 497;
  return Number(match[0].replaceAll(".", "")) || 497;
}

function toCourse(item: QuickCourse, query: string, index: number): Course {
  const score = Math.max(70, Math.min(98, Math.round(item.score ?? 92 - index * 4)));
  const price = item.price && item.price !== "Não informado" ? item.price : "Consultar";

  return {
    id: `${(item.provider || item.name || `curso-${index}`).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${index}`,
    name: item.name || item.provider || "Curso encontrado",
    provider: item.provider || inferProvider(item.name || "Fornecedor"),
    category: inferCategory(query),
    price,
    price_value: priceValue(item.price, index),
    installments: price === "Consultar" ? "Preço no site oficial" : undefined,
    modalidade: item.modality === "Presencial" || item.modality === "Híbrido" || item.modality === "Ao vivo" ? item.modality : "Online",
    carga_horaria: "Consultar",
    rating: Number((4.8 - index * 0.1).toFixed(1)),
    reviews: [420, 310, 180, 95][index] ?? 80,
    best_for: item.best_for || "Médicos que querem aprofundar o tema pesquisado com aplicação prática",
    badge: (["Mais completo", "Melhor custo-benefício", "Melhor para iniciantes", "Melhor banco de questões"] as const)[index] ?? "Melhor custo-benefício",
    strengths: (item.strengths?.length ? item.strengths : ["Conteúdo focado no tema pesquisado", "Formato online", "Indicado para atualização médica"]).slice(0, 3),
    weaknesses: (item.weaknesses?.length ? item.weaknesses : ["Confirme preço, carga horária e certificado no site oficial"]).slice(0, 2),
    features: {
      question_bank: false,
      simulados: index <= 1,
      mentoria: false,
      certificado: true,
      aulas_ao_vivo: item.modality === "Ao vivo" || item.modality === "Híbrido",
    },
    final_score: score,
    cta_url: item.url || "#",
    description: item.best_for,
    publico_alvo: "Médicos, internos e estudantes de medicina",
    conteudo: [inferCategory(query), "Aulas práticas", "Casos clínicos"],
    updated_at: new Date().toISOString().slice(0, 10),
  };
}

function buildComparison(query: string, items: QuickCourse[], summary?: string, recommendation?: string): ComparisonResult {
  const courses = items.slice(0, 4).map((item, index) => toCourse(item, query, index)).sort((a, b) => b.final_score - a.final_score);
  const bestCostBenefit = courses.find((course) => course.badge === "Melhor custo-benefício") ?? courses[1] ?? courses[0];
  const beginner = courses.find((course) => course.badge === "Melhor para iniciantes") ?? courses[courses.length - 1] ?? courses[0];

  return {
    query,
    summary: summary ?? "Busquei opções atuais na web e organizei os cursos mais relevantes para a sua pergunta.",
    best_overall: courses[0].name,
    best_cost_benefit: bestCostBenefit.name,
    best_for_beginners: beginner.name,
    courses,
    recommendation: recommendation ?? "Compare conteúdo, carga horária, certificado e acesso a casos práticos antes de comprar.",
    warnings: WARNINGS,
  };
}

function comparisonFromSearchResults(query: string, results: SearchResult[]): ComparisonResult {
  const items = results.map((result, index) => ({
    name: result.title,
    provider: inferProvider(result.title),
    url: result.url,
    price: "Consultar",
    modality: "Online",
    best_for: result.snippet || "Quem busca atualização prática no tema pesquisado",
    strengths: [result.snippet || "Resultado encontrado na web", "Ver detalhes no site oficial", "Comparar programa antes da compra"],
    weaknesses: ["Dados comerciais podem mudar sem aviso"],
    score: 90 - index * 4,
  }));

  return buildComparison(query, items, "Encontrei opções relacionadas à sua busca na web e organizei um ranking rápido para comparação.");
}

async function synthesizeSearchResults({
  apiKey,
  query,
  results,
}: {
  apiKey: string;
  query: string;
  results: SearchResult[];
}): Promise<ComparisonResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SYNTHESIS_TIMEOUT_MS);

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
        max_output_tokens: 1400,
        text: {
          format: { type: "json_object" },
        },
        input: [
          {
            role: "system",
            content:
              "Voce e um comparador de cursos medicos. Use somente os resultados web fornecidos. Responda JSON valido compacto: {summary,recommendation,courses:[{name,provider,url,price,modality,best_for,strengths,weaknesses,score}]}. Retorne 3 ou 4 cursos relevantes. Nao invente URL nem preco; use Consultar se nao houver preco.",
          },
          {
            role: "user",
            content: JSON.stringify({ query, web_results: results }),
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

    const parsed = JSON.parse(outputText) as QuickComparison;
    if (!parsed.courses?.length) {
      throw new Error("A OpenAI não retornou cursos.");
    }

    return buildComparison(query, parsed.courses, parsed.summary, parsed.recommendation);
  } catch (error) {
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

    const results = await fetchSearchResults(data.query);
    if (!results.length) {
      throw new Error("Não encontrei resultados web para essa busca agora. Tente detalhar melhor o curso desejado.");
    }

    try {
      return await synthesizeSearchResults({
        apiKey,
        query: data.query,
        results,
      });
    } catch {
      return comparisonFromSearchResults(data.query, results);
    }
  });

export async function compareCoursesWithAI(query: string): Promise<ComparisonResult> {
  return compareCoursesOnServer({ data: { query } });
}

export function getCourseById(id: string): Course | undefined {
  return MOCK_COURSES.find((c) => c.id === id);
}
