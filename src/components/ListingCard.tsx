import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Eye, MapPin, Tag } from "lucide-react";
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

  // Imagens dinâmicas variadas para os itens de teste se não houver foto real
  const defaultImages: Record<string, string> = {
    "Livro de Estruturas de Dados em C++": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    "Calculadora HP 50g": "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
    "Monitor 24\" Full HD": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    "Kit Arduino Uno + Sensors": "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80",
    "Jaleco branco tam. M": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  };

  const imageSrc = listing.image_url || defaultImages[listing.title] || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        className="overflow-hidden transition-all duration-300 hover:shadow-xl border-border/60 bg-card rounded-2xl cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="relative aspect-4/3 overflow-hidden bg-muted">
            <img
              src={imageSrc}
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
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <MapPin className="size-3" /> UNIFOR
              </span>
            </div>
          </CardContent>
        </div>

        <div className="p-4 pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleOpenModal}
            className="w-full rounded-xl gap-2 border-primary/30 text-primary hover:bg-primary/10 font-medium"
          >
            <Eye className="size-4" /> Ver Detalhes
          </Button>
        </div>
      </Card>

      {/* Modal de Tela Grande com Desfoque Profundo */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-background border border-border w-full max-w-3xl rounded-3xl p-6 md:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 rounded-full p-2.5 bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-10 shadow-sm"
            >
              <X className="size-5" />
            </button>

            {/* Layout Responsivo: Lado a Lado em telas médias/grandes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="overflow-hidden rounded-2xl aspect-square bg-muted relative shadow-inner">
                <img
                  src={imageSrc}
                  alt={listing.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-md shadow-sm">
                    {listing.category}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                    <Tag className="size-3.5" /> Anúncio Verificado Campus
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{listing.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Valor do Item</span>
                    <span className="text-2xl font-bold font-display text-primary">
                      {listing.is_donation || !listing.price
                        ? "Gratuito (Doação)"
                        : `R$ ${Number(listing.price).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs text-muted-foreground">
                    <span>Local de Retirada:</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <MapPin className="size-3 text-primary" /> Campus Universidade de Fortaleza
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-xl"
                  >
                    Voltar
                  </Button>
                  <Button
                    onClick={handleInterest}
                    className="w-full rounded-xl gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                  >
                    <MessageCircle className="size-4" /> Tenho Interesse (WhatsApp)
                  </Button>
                </div>
              </div>
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