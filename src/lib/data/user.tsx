import { cache } from "react";

export const getUser = cache(async (supabase: any) => await supabase.auth.getUser());
