import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const groups = [
  { title: "Categoria", items: ["Residência Médica", "Revalida", "R+", "ECG e Emergência", "Ultrassom POCUS"] },
  { title: "Modalidade", items: ["Online", "Ao vivo", "Híbrido"] },
  { title: "Recursos", items: ["Banco de questões", "Simulados", "Mentoria", "Certificado"] },
  { title: "Nível", items: ["Iniciante", "Intermediário", "Avançado"] },
];

export function FilterSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-20 rounded-2xl border border-border bg-card p-5">
        <p className="font-display text-base font-semibold">Filtros</p>
        <div className="mt-4 space-y-6">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{g.title}</p>
              <div className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Checkbox id={`${g.title}-${item}`} />
                    <Label htmlFor={`${g.title}-${item}`} className="text-sm font-normal">{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
