import { Link } from "@tanstack/react-router";
import { Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Recycle className="size-5" />
          </span>
          <span className="truncate font-display text-lg font-semibold">CirculaCampus</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/buscar">Buscar</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/anunciar">Anunciar</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
