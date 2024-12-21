"use client";

import { Match as MatchType } from "@/lib/definitions";
import { use, useState } from "react";
import { MatchDetails } from "@/components/matches";
import { formatDistanceToNow } from "date-fns";

export default function LastMatches({ matches }: { matches: any }) {
    const [currentMatch, setCurrentMatch] = useState<MatchType | null>(null);
    const matchesData = use<any>(matches);

    return (
        <div className="w-full text-gray-500">
            <MatchDetails
                match={currentMatch}
                onClose={() => setCurrentMatch(null)}
                isOpen={!!currentMatch}
            />
            <table className="w-full table-fixed">
                <tbody>
                    {matchesData.data.map((match: MatchType) => (
                        <tr
                            key={match.id}
                            onClick={() => setCurrentMatch(match)}
                            className="hover:text-gray-900 hover:cursor-pointer">
                            <td className="whitespace-nowrap overflow-hidden text-ellipsis pr-2">
                                {formatDistanceToNow(new Date(match.created_at), {
                                    addSuffix: true,
                                })}
                            </td>
                            <td className="whitespace-nowrap overflow-hidden text-ellipsis px-2">
                                {match.job.role}
                            </td>
                            <td className="whitespace-nowrap overflow-hidden text-ellipsis px-2">
                                {match.job.company}
                            </td>
                            <td className="whitespace-nowrap overflow-hidden text-ellipsis px-2 w-36">
                                {match.job.location}
                            </td>
                            <td className="whitespace-nowrap overflow-hidden text-ellipsis pl-2 w-14">
                                {Math.round(match.score * 100)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
