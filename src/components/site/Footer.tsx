import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-base font-semibold">Med<span className="text-medical">Compare</span></p>
          <p className="mt-2 text-sm text-muted-foreground">
            Compare cursos médicos antes de gastar milhares de reais.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Plataforma</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/comparar" className="hover:text-foreground">Comparar cursos</Link></li>
            <li><Link to="/categorias" className="hover:text-foreground">Categorias</Link></li>
            <li><Link to="/para-produtores" className="hover:text-foreground">Para produtores</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Conta</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/entrar" className="hover:text-foreground">Entrar</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Minha conta</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Avisos</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Este comparador não substitui orientação acadêmica ou profissional. Cursos lato sensu não equivalem automaticamente a título de especialista.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MedCompare · Feito para a comunidade médica
      </div>
    </footer>
  );
}
