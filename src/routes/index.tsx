import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Recycle, Users, Wallet } from "lucide-react";
import heroImage from "@/assets/hero-campus.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { Showcase } from "@/components/Showcase";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CirculaCampus — Economia circular no seu campus" },
      {
        name: "description",
        content:
          "Anuncie, doe e encontre livros, eletrônicos e materiais usados dentro da universidade. Menos desperdício, mais estudante ajudado.",
      },
      { property: "og:title", content: "CirculaCampus — Economia circular no seu campus" },
      {
        property: "og:description",
        content: "Vitrine de itens usados e doações entre estudantes da universidade.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/unifor-share.png" }, // Aqui é onde o WhatsApp puxa a imagem!
    ],
    links: [
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: "if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js'); }); }",
      },
    ],
  }),
  component: LandingPage,
});

const stats = [
  { icon: Recycle, value: "1.284", label: "Itens doados ou revendidos" },
  { icon: Users, value: "3.470", label: "Estudantes impactados" },
  { icon: Wallet, value: "R$ 186 mil", label: "Reais economizados" },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden">
        {/* Aqui mudei para text-center no celular e text-left no desktop */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20 text-center lg:text-left">
          
          {/* Adicionei flex-col e items-center para alinhar tudo ao meio no celular */}
          <div className="fade-up space-y-6 flex flex-col items-center lg:items-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              <Leaf className="size-3.5" /> Economia circular universitária
            </span>
            
            <h1 className="text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl tracking-tight">
              O que sobra de um semestre é o que falta para o próximo.
            </h1>
            
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              O CirculaCampus conecta estudantes do mesmo campus para revender, doar e reaproveitar
              livros, calculadoras, componentes e equipamentos. Nada de frete, nada de desperdício:
              o item troca de mãos no corredor ao lado.
            </p>
            
            {/* Botões ocupam 100% da tela no celular e ficam lado a lado no PC */}
            <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button asChild size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-full transition-transform hover:scale-105 shadow-md">
                <Link to="/anunciar">
                  Quero anunciar <ArrowRight className="size-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-full transition-transform hover:scale-105 border-2">
                <Link to="/buscar">Buscar itens</Link>
              </Button>
            </div>
          </div>

          <div className="fade-up relative mt-6 lg:mt-0">
            <div className="overflow-hidden rounded-3xl shadow-lift">
              <img
                src={heroImage}
                alt="Estudantes trocando livros e materiais usados em uma mesa no campus"
                width={1600}
                height={1104}
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center lg:items-start gap-4 justify-center lg:justify-start">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 text-left">
                <p className="font-display text-3xl font-semibold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 text-center lg:text-left">
        <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold sm:text-3xl">Vitrine pública</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Itens disponíveis agora no campus, atualizados por estudantes.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/buscar">
              Ver tudo <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <Showcase />
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        CirculaCampus · projeto de economia circular do campus
      </footer>
    </div>
  );
}