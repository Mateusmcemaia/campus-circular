import { Link } from "@tanstack/react-router";
import { Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Lado Esquerdo: Logo e Título com responsividade */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 transition-transform hover:scale-105 min-w-0">
          <div className="bg-primary text-primary-foreground p-1.5 sm:p-2 rounded-full shrink-0">
            <Recycle className="size-6 sm:size-10" />
          </div>
          <span className="font-bold text-lg sm:text-3xl tracking-tight truncate">
            CirculaCampus
          </span>
        </Link>

        {/* Lado Direito: Navegação otimizada para mobile */}
        <nav className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link 
            to="/buscar" 
            className="text-sm sm:text-xl font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block"
          >
            Buscar
          </Link>
          <Button asChild className="px-4 sm:px-6 py-2 sm:py-6 text-sm sm:text-xl font-semibold rounded-full shadow-sm">
            <Link to="/anunciar">
              Anunciar
            </Link>
          </Button>
        </nav>
        
      </div>
    </header>
  );
}