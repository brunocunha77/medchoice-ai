import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — MedCompare" },
      { name: "description", content: "Entre na sua conta MedCompare." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Entrar</h1>
      <p className="mt-2 text-sm text-muted-foreground">Acesse comparações salvas, favoritos e alertas de preço.</p>

      <form className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Email</Label>
          <Input type="email" required />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Senha</Label>
          <Input type="password" required />
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90">Entrar</Button>
        <Button type="button" variant="outline" className="w-full">Entrar com Google</Button>
        <p className="text-center text-xs text-muted-foreground">
          Não tem conta? <Link to="/entrar" className="text-medical hover:underline">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}
