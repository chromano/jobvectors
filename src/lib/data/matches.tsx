"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function shortlistMatch(matchId: string, shortlisted: boolean) {
    const supabase = await createClient();

    const response = await supabase
        .from("matches")
        .update({
            shortlisted: shortlisted,
            shortlisted_at: shortlisted && new Date().toISOString(),
        })
        .eq("id", matchId);
    console.log(response);
}

export async function applyMatch(matchId: string, applied: boolean) {
    const supabase = await createClient();

    await supabase
        .from("matches")
        .update({ applied: applied, applied_at: applied && new Date().toISOString() })
        .eq("id", matchId);
}

export async function dismissMatch(matchId: string) {
    const supabase = await createClient();

    await supabase
        .from("matches")
        .update({ dismissed: true, dismissed_at: new Date().toISOString() })
        .eq("id", matchId);
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

export async function getAllMatches(resumeId: any) {
    const supabase = await createClient();

    return supabase
        .from("matches")
        .select("*, job:jobs!inner(*)", { count: "exact" })
        .eq("resume_id", resumeId)
        .eq("dismissed", false)
        .order("score", { ascending: false })
        .order("id", { ascending: true });
}

export async function getHighestMatchScore(resumeId: any) {
    const supabase = await createClient();

    const { data } = await supabase
        .from("matches")
        .select("score")
        .eq("resume_id", resumeId)
        .order("score", { ascending: false })
        .limit(1)
        .single();

    return data?.score;
}

export async function getLastMatches() {
    const supabase = await createClient();
    const cookiesStore = await cookies();

    return supabase
        .from("matches")
        .select("*, job:jobs!inner(*)", { count: "exact" })
        .eq("resume_id", cookiesStore.get("resume")?.value)
        .eq("dismissed", false)
        .order("created_at", { ascending: false })
        .limit(5);
}

export async function getLastApplications() {
    const supabase = await createClient();
    const cookiesStore = await cookies();

    return supabase
        .from("matches")
        .select("*, job:jobs!inner(*)", { count: "exact" })
        .eq("resume_id", cookiesStore.get("resume")?.value)
        .eq("dismissed", false)
        .eq("applied", true)
        .order("applied_at", { ascending: false })
        .limit(5);
}
