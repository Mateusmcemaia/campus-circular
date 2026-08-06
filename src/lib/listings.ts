import { useEffect, useState } from "react";
import { supabase } from "./supabase"; // Garanta que o caminho para o supabase.ts está correto!

export const CATEGORIES = [
  "Livros",
  "Engenharia",
  "Computação",
  "Eletrônicos",
  "Outros",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Listing = {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number | null;
  imageUrl: string;
  author: string;
  mine?: boolean;
  createdAt: number | string;
};

// Hook para buscar TODOS os anúncios reais do Supabase
export function useAllListings() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*')
        .order('criado_em', { ascending: false });

      if (!error && data) {
        // Mapeia as colunas em Português do DB para os nomes em Inglês que a UI espera
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.titulo,
          description: item.descricao,
          category: item.categoria as Category,
          price: item.preco,
          imageUrl: item.imagem_url,
          author: "Estudante", // Simplificado por enquanto
          mine: false, 
          createdAt: item.criado_em,
        }));
        setListings(formatted);
      }
    }
    fetchListings();
  }, []);

  return listings;
}

// Hook temporário para os "Meus Anúncios" não quebrar a tela
export function useMyListings() {
  return useAllListings();
}

// Salva o anúncio direto no Banco de Dados
export async function addListing(input: Omit<Listing, "id" | "createdAt" | "mine" | "author">) {
  const { error } = await supabase.from('anuncios').insert([{
    titulo: input.title,
    descricao: input.description,
    categoria: input.category,
    preco: input.price,
    tipo_anuncio: input.price === null ? 'doacao' : 'venda',
    imagem_url: input.imageUrl
  }]);

  if (error) {
    console.error("Erro ao inserir:", error);
    alert("Erro ao salvar anúncio. Verifique o console.");
    return;
  }
  
  // Recarrega a página para puxar os dados novos
  window.location.reload(); 
}

// Deleta o anúncio do Banco de Dados
export async function removeListing(id: string) {
  const { error } = await supabase.from('anuncios').delete().eq('id', id);
  if (!error) window.location.reload();
}

export function formatPrice(price: number | null) {
  if (price === null) return "Doação";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// --- FUNÇÕES "FANTASMAS" PARA O LOVABLE NÃO QUEBRAR ---
// O sistema antigo chamava essas funções ao abrir o app. 
// Deixamos elas vazias aqui apenas para a tela não dar erro de "importação não encontrada".
export function hydrateMyListings() {}
export const SEED_LISTINGS: Listing[] = [];