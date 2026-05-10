import { Link } from "@tanstack/react-router";
import { Star, ExternalLink, Check } from "lucide-react";
import type { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const badgeColor: Record<string, string> = {
  "Mais completo": "bg-primary text-primary-foreground",
  "Melhor custo-benefício": "bg-medical text-medical-foreground",
  "Melhor para iniciantes": "bg-accent text-accent-foreground",
  "Melhor banco de questões": "bg-foreground text-background",
};

export function CourseCard({ course, rank }: { course: Course; rank?: number }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-medical/50 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {rank !== undefined && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary font-display text-base font-semibold text-primary">
              {rank}
            </span>
          )}
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight">{course.name}</h3>
            <p className="text-sm text-muted-foreground">{course.provider}</p>
          </div>
        </div>
        {course.badge && (
          <Badge className={`${badgeColor[course.badge]} border-0 text-[11px] font-medium`}>{course.badge}</Badge>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="font-medium">{course.rating}</span>
          <span className="text-muted-foreground">({course.reviews})</span>
        </div>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{course.modalidade}</span>
        <span className="text-muted-foreground">·</span>
        <span className="font-medium">Nota {course.final_score}</span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Melhor para:</span> {course.best_for}
      </p>

      <ul className="mt-4 space-y-1.5">
        {course.strengths.slice(0, 3).map((s) => (
          <li key={s} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-medical" />
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
        <div>
          <p className="font-display text-xl font-semibold">{course.price}</p>
          {course.installments && <p className="text-xs text-muted-foreground">{course.installments}</p>}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/curso/$id" params={{ id: course.id }}>Ver detalhes</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <a href={course.cta_url} target="_blank" rel="noreferrer">
              Ir para o curso <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
