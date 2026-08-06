import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addListing, CATEGORIES, type Category } from "@/lib/listings";

export const Route = createFileRoute("/anunciar")({
  head: () => ({
    meta: [
      { title: "Anunciar um item — CirculaCampus" },
      {
        name: "description",
        content:
          "Cadastre um item para venda ou doação em poucos segundos e ajude outro estudante do campus.",
      },
      { property: "og:title", content: "Anunciar um item — CirculaCampus" },
      {
        property: "og:description",
        content: "Cadastre um item para venda ou doação no CirculaCampus.",
      },
    ],
  }),
  component: AnunciarPage,
});

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=70";

function AnunciarPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [mode, setMode] = useState<"venda" | "doacao">("venda");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !category) {
      toast.error("Preencha o título e a categoria.");
      return;
    }
    if (mode === "venda" && !Number(price)) {
      toast.error("Informe um preço válido ou marque como doação.");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    addListing({
      title: title.trim(),
      description: description.trim() || "Sem descrição.",
      category,
      price: mode === "doacao" ? null : Number(price),
      imageUrl: imageUrl.trim() || FALLBACK_IMAGE,
    });

    setSubmitting(false);
    toast.success("Anúncio publicado na vitrine!");
    navigate({ to: "/meus-anuncios" });
  }

  return (
    <AppShell
      title="Novo anúncio"
      subtitle="Dê uma segunda vida ao que não te serve mais. Leva menos de um minuto."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex.: Livro de Cálculo A, volume 1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Estado de conservação, tempo de uso, onde retirar..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Escolha uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Como você quer repassar?</Label>
          <RadioGroup
            value={mode}
            onValueChange={(v) => setMode(v as "venda" | "doacao")}
            className="grid grid-cols-2 gap-3"
          >
            <Label
              htmlFor="mode-venda"
              className="flex cursor-pointer items-center gap-2 rounded-2xl border border-border p-3 text-sm font-medium transition-colors has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary/5"
            >
              <RadioGroupItem value="venda" id="mode-venda" /> Venda
            </Label>
            <Label
              htmlFor="mode-doacao"
              className="flex cursor-pointer items-center gap-2 rounded-2xl border border-border p-3 text-sm font-medium transition-colors has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary/5"
            >
              <RadioGroupItem value="doacao" id="mode-doacao" /> Doação
            </Label>
          </RadioGroup>

          {mode === "venda" ? (
            <div className="fade-up space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="45"
              />
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">URL da imagem</Label>
          <Input
            id="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
          <p className="text-xs text-muted-foreground">
            Opcional — usamos uma imagem padrão se você deixar em branco.
          </p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Publicando...
            </>
          ) : (
            "Publicar anúncio"
          )}
        </Button>
      </form>
    </AppShell>
  );
}
