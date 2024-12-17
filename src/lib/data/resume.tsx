import { cache } from "react";

export const getLastResume = cache(
    async (supabase: any, user: any) =>
        await supabase
            .from("resumes")
            .select("id")
            .eq("user", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single(),
);

export const getResumes = cache(
    async (supabase: any, userId: any) =>
        await supabase
            .from("resumes")
            .select("id, title")
            .eq("user", userId)
            .order("created_at", { ascending: false }),
);
