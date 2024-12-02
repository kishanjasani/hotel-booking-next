import { createClient } from "./supabase-js";

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
