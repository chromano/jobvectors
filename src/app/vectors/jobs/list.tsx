import Matches from "@/components/matches";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/data/user";
import { Suspense } from "react";
import Loading from "@/components/loading";

const ITEMS_PER_PAGE = 30;

export default async function MatchList({
    filters,
    page,
}: {
    filters: { field: string; value: boolean }[];
    page: number;
}) {
    const supabase = await createClient();

    const user = await getUser(supabase);
    const resume = await supabase
        .from("resumes")
        .select("id")
        .eq("user", user.data.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
    let matches = supabase
        .from("matches")
        .select("*, job:jobs!inner(*)", { count: "exact" })
        .eq("resume_id", resume.data?.id)
        .eq("dismissed", false)
        .order("score", { ascending: false })
        .order("id", { ascending: true });
    for (const filter of filters) {
        matches = matches.eq(filter.field, filter.value);
    }
    matches = matches.range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

    return (
        <Suspense fallback={<Loading />}>
            <Matches matches={matches} page={page} itemsPerPage={ITEMS_PER_PAGE} />
        </Suspense>
    );
}
