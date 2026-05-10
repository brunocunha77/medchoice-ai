export interface CourseFeatures {
  question_bank: boolean;
  simulados: boolean;
  mentoria: boolean;
  certificado: boolean;
  aulas_ao_vivo: boolean;
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  category: string;
  price: string;
  price_value: number;
  installments?: string;
  modalidade: "Online" | "Ao vivo" | "Híbrido" | "Presencial";
  carga_horaria?: string;
  rating: number;
  reviews: number;
  best_for: string;
  badge?: "Mais completo" | "Melhor custo-benefício" | "Melhor para iniciantes" | "Melhor banco de questões";
  strengths: string[];
  weaknesses: string[];
  features: CourseFeatures;
  final_score: number;
  cta_url: string;
  image?: string;
  description?: string;
  professor?: string;
  publico_alvo?: string;
  conteudo?: string[];
  updated_at?: string;
}

export interface ComparisonResult {
  query: string;
  summary: string;
  best_overall: string;
  best_cost_benefit: string;
  best_for_beginners: string;
  courses: Course[];
  recommendation: string;
  warnings?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProducerLead {
  responsavel: string;
  email: string;
  whatsapp: string;
  curso: string;
  categoria: string;
  site: string;
  preco: string;
  descricao: string;
}
