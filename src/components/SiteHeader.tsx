import { Link } from "@tanstack/react-router";
import { Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Aumentei a altura do header de h-14/16 para h-24 para acomodar elementos maiores */}
      <div className="container flex h-24 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Lado Esquerdo: Logo e Título */}
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="bg-primary text-primary-foreground p-2 rounded-full">
            {/* Ícone gigante */}
            <Recycle className="size-8 sm:size-10" />
          </div>
          {/* Título gigante */}
          <span className="font-bold text-2xl sm:text-3xl tracking-tight">
            CirculaCampus
          </span>
        </Link>

        {/* Lado Direito: Navegação e Botão */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link 
            to="/buscar" 
            className="text-lg sm:text-xl font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Buscar
          </Link>
          <Button asChild size="lg" className="px-6 py-6 text-lg sm:text-xl font-semibold rounded-full shadow-sm">
            <Link to="/anunciar">
              Anunciar
            </Link>
          </Button>
        </nav>
        
      </div>
    </header>
  );
}