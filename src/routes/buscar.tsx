import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Showcase } from "@/components/Showcase";

export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar itens no campus — CirculaCampus" },
      {
        name: "description",
        content:
          "Filtre por Livros, Engenharia, Computação, Eletrônicos e mais para encontrar itens usados e doações no seu campus.",
      },
      { property: "og:title", content: "Buscar itens no campus — CirculaCampus" },
      {
        property: "og:description",
        content: "Vitrine filtrável de itens usados e doações entre estudantes.",
      },
    ],
  }),
  component: BuscarPage,
});

function BuscarPage() {
  return (
    <AppShell
      title="Explorar o campus"
      subtitle="Filtre por categoria e encontre o que você precisa a poucos metros de distância."
    >
      <div className="rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-6">
        <Showcase compact />
      </div>
    </AppShell>
  );
}
