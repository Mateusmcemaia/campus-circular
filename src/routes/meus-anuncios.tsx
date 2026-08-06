import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ListingCard, ListingCardSkeleton } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { hydrateMyListings, removeListing, useMyListings } from "@/lib/listings";

export const Route = createFileRoute("/meus-anuncios")({
  head: () => ({
    meta: [
      { title: "Meus anúncios — CirculaCampus" },
      {
        name: "description",
        content: "Acompanhe e gerencie os itens que você publicou no CirculaCampus.",
      },
      { property: "og:title", content: "Meus anúncios — CirculaCampus" },
      {
        property: "og:description",
        content: "Gerencie e exclua os itens que você publicou no campus.",
      },
    ],
  }),
  component: MeusAnunciosPage,
});

function MeusAnunciosPage() {
  const listings = useMyListings();
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    hydrateMyListings();
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  async function handleDelete(id: string, title: string) {
    setDeletingId(id);
    await new Promise((resolve) => setTimeout(resolve, 400));
    removeListing(id);
    setDeletingId(null);
    toast.success(`"${title}" foi removido da vitrine.`);
  }

  return (
    <AppShell
      title="Meus anúncios"
      subtitle="Tudo que você colocou em circulação no campus fica aqui."
    >
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ListingCardSkeleton />
          <ListingCardSkeleton />
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center shadow-soft">
          <p className="font-display text-lg font-semibold">Você ainda não anunciou nada</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Aquele livro do semestre passado pode servir para alguém agora.
          </p>
          <Button asChild className="mt-5">
            <Link to="/anunciar">
              <PlusCircle className="size-4" /> Criar meu primeiro anúncio
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {listings.map((listing) => (
            <div key={listing.id} className="fade-up">
              <ListingCard
                listing={listing}
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    disabled={deletingId === listing.id}
                    onClick={() => handleDelete(listing.id, listing.title)}
                  >
                    {deletingId === listing.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                    Excluir
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
