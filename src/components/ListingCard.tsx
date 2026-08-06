import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  is_donation: boolean;
  image_url: string;
  user_id?: string;
}

export function ListingCard({ listing }: { listing: Listing }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleInterest = () => {
    toast.success("Redirecionando para contato com o estudante...");
    const message = encodeURIComponent(
      `Olá! Vi seu anúncio "${listing.title}" no CirculaCampus e tenho interesse.`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <>
      {/* O card inteiro agora é clicável */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer group">
        <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-lg border-border/60 bg-card rounded-2xl">
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
            <div className="flex items-center justify-between pt-2">
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
        </Card>
      </div>

      {/* Modal de Detalhes do Anúncio */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg rounded-3xl p-6">
          <DialogHeader className="space-y-3">
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
            <DialogTitle className="text-xl font-bold">{listing.title}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-1">
              {listing.description}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 border-y border-border my-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Valor</p>
              <p className="text-2xl font-bold font-display text-primary mt-0.5">
                {listing.is_donation || !listing.price
                  ? "Gratuito (Doação)"
                  : `R$ ${Number(listing.price).toFixed(2)}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Local de Retirada</p>
              <p className="text-sm font-medium text-foreground mt-0.5">Corredor do Bloco / Campus</p>
            </div>
          </div>

          <DialogFooter className="flex gap-3 sm:gap-0 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto rounded-full"
            >
              Fechar
            </Button>
            <Button
              onClick={handleInterest}
              className="w-full sm:w-auto rounded-full gap-2 bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="size-4" /> Tenho Interesse (WhatsApp)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}