import Loading from "@/components/loading";
import { Suspense } from "react";
import MatchList from "../list";

export default async function AllJobsPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams;
    const filters: { field: string; value: boolean }[] = [];

    return (
        <Suspense fallback={<Loading />}>
            <MatchList filters={filters} params={params} />
        </Suspense>
    );
}
