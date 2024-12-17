import Loading from "@/components/loading";
import { Suspense } from "react";
import MatchList from "../list";

export default async function ShortlistedJobsPage({ searchParams }: { searchParams: any }) {
    const filters = [{ field: "shortlisted", value: true }];
    const params = await searchParams;

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <MatchList filters={filters} params={params} />
            </Suspense>
        </div>
    );
}
