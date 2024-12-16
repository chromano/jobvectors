import { cache } from "react";

export const getUser = cache(async (supabase) => await supabase.auth.getUser());
