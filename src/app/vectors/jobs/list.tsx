"use server";
import Matches from "@/components/matches";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { createClient } from "@/lib/supabase/server";
import { getMatches } from "@/lib/data/matches";
import { getResumes } from "@/lib/data/resume";
import { ResumeDropdown } from "@/components/resume";

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
    const resumes = getResumes(supabase, user.data.user && user.data.user.id);
    const matches =
        params.resume && getMatches(params.resume, filters, params.page, ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-4">
            <ResumeDropdown resumes={resumes} initial={params.resume} />

            <Suspense key={Date.now()} fallback={<Loading />}>
                <Matches matches={matches} itemsPerPage={ITEMS_PER_PAGE} />
            </Suspense>
        </div>
    );
}
