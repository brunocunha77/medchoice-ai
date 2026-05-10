import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/para-produtores")({
  head: () => ({
    meta: [
      { title: "Para produtores — MedCompare" },
      { name: "description", content: "Cadastre seu curso médico e receba alunos qualificados." },
    ],
  }),
  component: ProducersPage,
});

const BENEFITS = [
  "Apareça em comparações feitas por IA",
  "Receba leads qualificados",
  "Aumente a confiança com avaliações verificadas",
  "Destaque seus diferenciais",
  "Pague apenas comissão sobre vendas ou leads qualificados",
];

function ProducersPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Cadastro enviado para análise. Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full border border-medical/30 bg-medical/5 px-3 py-1 text-xs font-medium text-medical">Para produtores</span>
          <h1 className="mt-4 font-display text-4xl font-semibold text-balance sm:text-5xl">Cadastre seu curso médico no comparador</h1>
          <p className="mt-4 text-muted-foreground">
            Receba alunos qualificados que já estão pesquisando e comparando antes de comprar.
          </p>
          <ul className="mt-8 space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-medical/10 text-medical">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold">Cadastrar meu curso</h2>
          <p className="mt-1 text-sm text-muted-foreground">Análise em até 3 dias úteis.</p>

          <div className="mt-6 grid gap-4">
            <Field label="Nome do responsável"><Input required name="responsavel" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email"><Input required type="email" name="email" /></Field>
              <Field label="WhatsApp"><Input required name="whatsapp" placeholder="(11) 99999-9999" /></Field>
            </div>
            <Field label="Nome do curso"><Input required name="curso" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Categoria"><Input required name="categoria" placeholder="Ex: Residência, Revalida..." /></Field>
              <Field label="Preço"><Input required name="preco" placeholder="R$" /></Field>
            </div>
            <Field label="Site do curso"><Input required name="site" placeholder="https://" /></Field>
            <Field label="Descrição"><Textarea required name="descricao" rows={4} /></Field>
          </div>

          <Button type="submit" disabled={sending} className="mt-6 w-full bg-primary hover:bg-primary/90">
            {sending ? "Enviando..." : "Enviar para análise"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
