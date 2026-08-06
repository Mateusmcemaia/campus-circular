import { createClient } from '@supabase/supabase-js'

// Inserindo as chaves diretamente para contornar o bloqueio de SSR do Vite
const supabaseUrl = 'https://kwzmmcmpnobtiqgvythv.supabase.co';
const supabaseAnonKey = 'sb_publishable_szkWLIIUDaXT50_FQFFFAQ_JM6qVkuL';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);