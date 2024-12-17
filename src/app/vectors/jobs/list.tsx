"use server";
import Matches from "@/components/matches";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { createClient } from "@/lib/supabase/server";
import { getMatches } from "@/lib/data/matches";

const ITEMS_PER_PAGE = 30;

export default async function MatchList({
    filters,
    params,
}: {
    filters: { field: string; value: boolean }[];
    params: any;
}) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const resumes = await supabase
        .from("resumes")
        .select("id, title")
        .eq("user", user.data.user?.id)
        .order("created_at", { ascending: false });
    let firstResume = null;
    if (resumes.data && resumes.data.length > 0) {
        firstResume = resumes.data[0].id;
    }
    const matches = await getMatches(
        params.resume || firstResume,
        filters,
        params.page,
        ITEMS_PER_PAGE,
    );

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Matches resumes={resumes.data} matches={matches} itemsPerPage={ITEMS_PER_PAGE} />
            </Suspense>
        </div>
    );
}
