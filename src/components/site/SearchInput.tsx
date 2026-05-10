import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  initialValue?: string;
  size?: "default" | "lg";
  suggestions?: string[];
  onSubmit?: (query: string) => void;
}

export function SearchInput({ initialValue = "", size = "lg", suggestions, onSubmit }: Props) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  const submit = (q: string) => {
    const query = q.trim();
    if (!query) return;
    if (onSubmit) onSubmit(query);
    else navigate({ to: "/comparar", search: { query } });
  };


  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className={`group flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-[0_10px_40px_-15px_oklch(0.27_0.08_250/0.25)] transition focus-within:border-medical focus-within:ring-4 focus-within:ring-medical/15 ${
          size === "lg" ? "pl-4" : "pl-3"
        }`}
      >
        <Sparkles className="h-5 w-5 shrink-0 text-medical" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ex: Compare os melhores cursos para residência médica em clínica médica"
          className={`flex-1 bg-transparent outline-none placeholder:text-muted-foreground ${
            size === "lg" ? "py-3 text-base" : "py-2 text-sm"
          }`}
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90" size={size === "lg" ? "lg" : "default"}>
          Comparar cursos
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </form>

      {suggestions && suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setValue(s);
                submit(s);
              }}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-medical hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
