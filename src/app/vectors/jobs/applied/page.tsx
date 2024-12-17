import Loading from "@/components/loading";
import { Suspense } from "react";
import MatchList from "../list";

export default async function AppliedJobsPage({ searchParams }: { searchParams: any }) {
    const filters = [{ field: "applied", value: true }];
    const params = await searchParams;

    return (
        <Suspense fallback={<Loading />}>
            <MatchList filters={filters} params={params} />
        </Suspense>
    );
}
