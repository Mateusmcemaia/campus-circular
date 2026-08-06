import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, type Listing } from "@/lib/listings";
import type { ReactNode } from "react";

export function ListingCard({ listing, action }: { listing: Listing; action?: ReactNode }) {
  const isDonation = listing.price === null;

  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl border-border/70 p-0 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge
          className="absolute top-3 left-3 border-transparent bg-background/90 text-foreground"
          variant="secondary"
        >
          {listing.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base leading-snug font-semibold">{listing.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span
            className={
              isDonation
                ? "rounded-full bg-donation px-3 py-1 text-xs font-semibold text-donation-foreground"
                : "text-lg font-semibold text-primary"
            }
          >
            {formatPrice(listing.price)}
          </span>
          {action ?? <span className="truncate text-xs text-muted-foreground">{listing.author}</span>}
        </div>
      </div>
    </Card>
  );
}

export function ListingCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border/70 p-0">
      <Skeleton className="aspect-4/3 rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-5 w-24" />
      </div>
    </Card>
  );
}
