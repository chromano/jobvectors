"use server";
import Matches from "@/components/matches";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { createClient } from "@/lib/supabase/server";
import { getMatches } from "@/lib/data/matches";
import { getResumes } from "@/lib/data/resume";
import { ResumeDropdown } from "@/components/resume";
import { cookies } from "next/headers";

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
    const cookiesStore = await cookies();
    const cookieVal = cookiesStore.get("resume");
    const resumeId = cookieVal && cookieVal.value;
    const matches = resumeId && getMatches(resumeId, filters, params.page, ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-4">
            <ResumeDropdown resumes={resumes} initial={resumeId} />

            <Suspense fallback={<Loading />}>
                <Matches matches={matches} itemsPerPage={ITEMS_PER_PAGE} />
            </Suspense>
        </div>
    );
}
