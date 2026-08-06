import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin } from "lucide-react";
import { toast } from "sonner";

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price?: number | null;
  is_donation?: boolean;
  image_url?: string;
  user_id?: string;
}

export function ListingCard({ listing }: { listing: Listing }) {
  const defaultImages: Record<string, string> = {
    "Livro de Estruturas de Dados em C++": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    "Calculadora HP 50g": "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
    "Monitor 24\" Full HD": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    "Kit Arduino Uno + Sensors": "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80",
    "Jaleco branco tam. M": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  };

  const imageSrc = listing.image_url || defaultImages[listing.title] || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";

  const handleInterest = () => {
    toast.success("Redirecionando para contato com o estudante...");
    const message = encodeURIComponent(
      `Olá! Vi seu anúncio "${listing.title}" no CirculaCampus (${listing.description.substring(0, 60)}...) e tenho interesse.`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/60 bg-card rounded-2xl flex flex-col justify-between">
      <div>
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <img
            src={imageSrc}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md font-medium shadow-sm">
              {listing.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-base line-clamp-1 text-foreground">
            {listing.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {listing.description}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="font-display font-bold text-lg text-foreground">
              {listing.is_donation || !listing.price ? (
                <span className="text-primary text-xs font-semibold uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full">
                  Doação
                </span>
              ) : (
                `R$ ${Number(listing.price).toFixed(2)}`
              )}
            </span>
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <MapPin className="size-3" /> UNIFOR
            </span>
          </div>
        </CardContent>
      </div>

      <div className="p-4 pt-0">
        <Button 
          onClick={handleInterest}
          className="w-full rounded-xl gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
        >
          <MessageCircle className="size-4" /> Tenho Interesse (WhatsApp)
        </Button>
      </div>
    </Card>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-4 space-y-3 animate-pulse">
      <div className="aspect-4/3 w-full bg-muted rounded-xl" />
      <div className="h-5 w-3/4 bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 w-1/3 bg-muted rounded" />
        <div className="h-4 w-1/4 bg-muted rounded" />
      </div>
    </div>
  );
}