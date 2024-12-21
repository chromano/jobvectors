import Empty from "@/components/empty";
import { getLastApplications, getLastMatches } from "@/lib/data/matches";
import LastMatches from "./lastmatches";

export default async function Home() {
    const matches = getLastMatches();
    const applications = getLastApplications();

    return (
        <div className="w-full font-[family-name:var(--font-nunito-sans)] flex flex-col gap-8">
            <div>
                <h2 className="font-semibold text-lg mb-4">Last matches</h2>
                <LastMatches matches={matches} />
            </div>
            <div>
                <h2 className="font-semibold text-lg mb-4">Last applications</h2>
                <LastMatches matches={applications} />
            </div>
            <div>
                <h2 className="font-semibold text-lg mb-4">Resumes ranking</h2>
                <Empty />
            </div>
        </div>
    );
}
