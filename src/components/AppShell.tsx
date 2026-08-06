import { Link } from "@tanstack/react-router";
import { Search, PlusCircle, LayoutList, Home } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/buscar", label: "Explorar", icon: Search },
  { to: "/anunciar", label: "Anunciar", icon: PlusCircle },
  { to: "/meus-anuncios", label: "Meus itens", icon: LayoutList },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Aqui substituímos o bg-hero-gradient pelo bg-primary para usar o azul da UNIFOR */}
      <div className="bg-primary px-4 pt-8 pb-10 text-primary-foreground">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          {subtitle ? (
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/85">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <main className="mx-auto -mt-6 max-w-3xl px-4 fade-up">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl">
          {tabs.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: true }}
              className="flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icon className="size-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}