import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Stethoscope className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Med<span className="text-medical">Compare</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
