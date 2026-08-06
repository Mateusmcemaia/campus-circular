import { Link } from "@tanstack/react-router";
import { Recycle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Adicionei gap-4 para garantir que os elementos nunca se espremam */}
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto gap-4">
        
        {/* Lado Esquerdo: Logo e Nome */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 transition-transform hover:scale-105 shrink-0">
          <div className="bg-primary text-primary-foreground p-1.5 sm:p-2 rounded-full">
            <Recycle className="size-6 sm:size-8" />
          </div>
          <span className="font-bold text-xl sm:text-2xl tracking-tight">
            CirculaCampus
          </span>
        </Link>

        {/* Centro: Barra de Pesquisa (Visível no desktop, escondida no celular) */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <Link to="/buscar" className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="w-full h-11 pl-11 pr-4 rounded-full border-2 border-muted bg-muted/30 flex items-center text-sm text-muted-foreground group-hover:border-primary/40 group-hover:bg-background transition-all cursor-text shadow-sm">
              Buscar itens, livros, materiais...
            </div>
          </Link>
        </div>

        {/* Lado Direito: Botão Anunciar */}
        <div className="shrink-0">
          <Button asChild className="px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-full shadow-sm">
            <Link to="/anunciar">
              Anunciar
            </Link>
          </Button>
        </div>
        
      </div>
    </header>
  );
}