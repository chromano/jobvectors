import Loading from "@/components/loading";
import Matches from "@/components/matches";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase";
import Pagination from "@/components/pagination";

const ITEMS_PER_PAGE = 50;

export default async function AllJobsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const supabase = await createClient();
    const params = await searchParams;
    const page = params.page ? parseInt(params.page as string, 10) : 0;
    const matches = supabase
        .from("matches")
        .select("*, job:jobs!inner(*)", { count: "exact" })
        .eq("resume_id", 72)
        .order("score", { ascending: false })
        .order("id", { ascending: true })
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Matches matches={matches} />
                <Pagination itemsPerPage={ITEMS_PER_PAGE} items={matches} page={page} />
            </Suspense>
        </div>
    );
}
