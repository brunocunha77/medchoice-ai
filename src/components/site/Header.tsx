import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Stethoscope className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Med<span className="text-medical">Compare</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition-colors">Início</Link>
          <Link to="/comparar" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition-colors">Comparar Cursos</Link>
          <Link to="/categorias" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition-colors">Categorias</Link>
          <Link to="/para-produtores" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition-colors">Para Produtores</Link>
          <Link to="/entrar" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition-colors">Entrar</Link>
        </nav>

        <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
          <Link to="/comparar">Comparar agora</Link>
        </Button>
      </div>
    </header>
  );
}
