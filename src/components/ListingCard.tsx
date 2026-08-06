import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Eye } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Abrindo modal para o item:", listing.title);
    setIsOpen(true);
  };

  const handleInterest = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Redirecionando para contato com o estudante...");
    const message = encodeURIComponent(
      `Olá! Vi seu anúncio "${listing.title}" no CirculaCampus e tenho interesse.`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Card Principal */}
      <Card 
        onClick={handleOpenModal}
        className="overflow-hidden transition-all duration-300 hover:shadow-lg border-border/60 bg-card rounded-2xl cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="relative aspect-4/3 overflow-hidden bg-muted">
            <img
              src={
                listing.image_url ||
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
              }
              alt={listing.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-md font-medium shadow-sm">
                {listing.category}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
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
              <span className="text-xs text-muted-foreground font-medium">
                Campus UNIFOR
              </span>
            </div>
          </CardContent>
        </div>

        {/* Botão visível para forçar a abertura do modal */}
        <div className="p-4 pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleOpenModal}
            className="w-full rounded-xl gap-2 border-primary/30 text-primary hover:bg-primary/10"
          >
            <Eye className="size-4" /> Ver Detalhes
          </Button>
        </div>
      </Card>

      {/* Modal Customizado */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-background border border-border w-full max-w-lg rounded-3xl p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-full p-2 bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="size-4" />
            </button>

            <div className="overflow-hidden rounded-2xl aspect-video bg-muted relative">
              <img
                src={
                  listing.image_url ||
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                }
                alt={listing.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-md">
                  {listing.category}
                </Badge>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold">{listing.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </div>

            <div className="py-3 border-y border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Valor</p>
                <p className="text-xl font-bold font-display text-primary mt-0.5">
                  {listing.is_donation || !listing.price
                    ? "Gratuito (Doação)"
                    : `R$ ${Number(listing.price).toFixed(2)}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Local de Retirada</p>
                <p className="text-sm font-medium text-foreground mt-0.5">Campus UNIFOR</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-full"
              >
                Fechar
              </Button>
              <Button
                onClick={handleInterest}
                className="w-full rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <MessageCircle className="size-4" /> Tenho Interesse (WhatsApp)
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
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