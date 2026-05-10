import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, History, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Sua conta</h1>
      <p className="mt-2 text-muted-foreground">Comparações salvas, favoritos e alertas.</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card icon={History} title="Comparações salvas" value="0" />
        <Card icon={Heart} title="Cursos favoritos" value="0" />
        <Card icon={Sparkles} title="Buscas recentes" value="0" />
        <Card icon={Bell} title="Alertas de preço" value="0" />
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
        <h2 className="font-display text-xl font-semibold">Comece sua primeira comparação</h2>
        <p className="mt-1 text-sm text-muted-foreground">Suas comparações aparecerão aqui automaticamente.</p>
        <Button asChild className="mt-5 bg-primary hover:bg-primary/90">
          <Link to="/comparar">Comparar cursos</Link>
        </Button>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, value }: { icon: typeof Heart; title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-medical" /> {title}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}
