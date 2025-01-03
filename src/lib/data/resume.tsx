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

export const getResume = cache(
    async (supabase: any, id: any) =>
        await supabase.from("resumes").select("id, title, skills").eq("id", id).single(),
);

export const getResumes = cache(async (supabase: any, userId: any) =>
    supabase
        .from("resumes")
        .select("id, title, skills")
        .eq("user", userId)
        .order("created_at", { ascending: false }),
);
