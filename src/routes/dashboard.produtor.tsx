import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users, MousePointerClick, TrendingUp, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/produtor")({
  component: ProducerDashboard,
});

function ProducerDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Painel do produtor</h1>
          <p className="mt-2 text-muted-foreground">Acompanhe seus cursos, leads e desempenho.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><Plus className="mr-1 h-4 w-4" /> Adicionar novo curso</Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Users} label="Leads recebidos" value="128" />
        <Stat icon={MousePointerClick} label="Cliques" value="2.341" />
        <Stat icon={TrendingUp} label="Taxa de conversão" value="5,4%" />
        <Stat icon={Star} label="Avaliação média" value="4,7" />
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Cursos cadastrados</h2>
          <Badge className="bg-medical/10 text-medical border-0">
            <ShieldCheck className="mr-1 h-3 w-3" /> Verificado
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Você ainda não cadastrou cursos.</p>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-medical" /> {label}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}
