"use client";
import { use } from "react";
import Match from "./match";
import { Match as MatchType, QueryResultWithCount } from "@/lib/definitions";

export default function Matches({ matches }: { matches: QueryResultWithCount }) {
    const entries = use(matches);

    return (
        <div className="flex flex-col gap-y-4">
            <div className={`container grid grid-cols-1 md:grid-cols-2 gap-4 z-0`}>
                {entries?.data?.map((match: MatchType) => (
                    <Match match={match} key={match.id} />
                ))}
            </div>
        </div>
    );
}
