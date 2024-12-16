import { cache } from "react";

export const getLastResume = cache(
    async (supabase, user) =>
        await supabase
            .from("resumes")
            .select("id")
            .eq("user", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
);
