"use server";
import { createClient } from "@/lib/supabase/server";

export async function shortlistMatch(matchId: string, shortlisted: boolean) {
    const supabase = await createClient();

    await supabase.from("matches").update({ shortlisted: shortlisted }).eq("id", matchId);
}

export async function applyMatch(matchId: string, applied: boolean) {
    const supabase = await createClient();

    await supabase.from("matches").update({ applied: applied }).eq("id", matchId);
}

export async function dismissMatch(matchId: string) {
    const supabase = await createClient();

    await supabase.from("matches").update({ dismissed: true }).eq("id", matchId);
}

export async function getMatches(resumeId: any, filters: any, page: any, itemsPerPage: any) {
    const supabase = await createClient();
    const page_number = parseInt(page || "0", 10);

    let query = supabase
        .from("matches")
        .select("*, job:jobs!inner(*)", { count: "exact" })
        .eq("resume_id", resumeId)
        .eq("dismissed", false)
        .order("score", { ascending: false })
        .order("id", { ascending: true })
        .range(page_number * itemsPerPage, (page_number + 1) * itemsPerPage - 1);
    for (const filter of filters) {
        query = query.eq(filter.field, filter.value);
    }

    return query;
}
