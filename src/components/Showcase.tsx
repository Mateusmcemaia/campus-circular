import { useEffect, useState } from "react";
import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";
import { ListingCard, ListingCardSkeleton } from "@/components/ListingCard";
import { hydrateMyListings, useAllListings } from "@/lib/listings";

export function Showcase({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState<CategoryFilterValue>("Todos");
  const [loading, setLoading] = useState(true);
  const listings = useAllListings();

  useEffect(() => {
    hydrateMyListings();
    const timer = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

  const filtered =
    category === "Todos" ? listings : listings.filter((l) => l.category === category);

  return (
    <div className="space-y-6">
      <CategoryFilter value={category} onChange={setCategory} />

      {loading ? (
        <div
          className={
            compact
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
              : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {Array.from({ length: compact ? 4 : 6 }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Nenhum item nesta categoria por enquanto. Seja o primeiro a anunciar!
        </p>
      ) : (
        <div
          className={
            compact
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
              : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {filtered.map((listing) => (
            <div key={listing.id} className="fade-up">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
