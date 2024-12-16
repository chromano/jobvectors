import Loading from "@/components/loading";
import { Suspense } from "react";
import MatchList from "../list";

export default async function ShortlistedJobsPage({ searchParams }: { searchParams: any }) {
    const page = parseInt((await searchParams).page, 10) || 0;
    const filters = [{ field: "shortlisted", value: true }];

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <MatchList filters={filters} page={page} />
            </Suspense>
        </div>
    );
}
