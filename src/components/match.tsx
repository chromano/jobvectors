"use client";
import type { Match } from "@/lib/definitions";
import Score from "./score";
import {
    TrashIcon,
    StarIcon,
    PaperAirplaneIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function Match({
    match,
    onMatchShortlisted,
    onMatchApplied,
    onMatchRemoval,
    onMatchDetails,
}: {
    match: Match;
    onMatchShortlisted: (match: Match) => void;
    onMatchApplied: (match: Match) => void;
    onMatchRemoval: (match: Match) => void;
    onMatchDetails: (match: Match) => void;
}) {
    const toggleShortlist = () => {
        onMatchShortlisted(match);
    };

    const toggleApplied = () => {
        onMatchApplied(match);
    };

    const removeMatch = () => {
        onMatchRemoval(match);
    };

    return (
        <>
            <div className="group flex flex-col flex-1 h-full bg-white rounded border border-gray-200 p-4 hover:border-purple-800 hover:outline hover:outline-purple-800">
                <div className="flex justify-between items-start">
                    <h2 className="text-md font-bold text-gray-800 whitespace-nowrap text-ellipsis overflow-hidden">
                        {match.job.role}
                    </h2>
                    <Score score={match.score} />
                </div>

                <div className="">
                    <p className="text-gray-600 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                        {match.job.company}{" "}
                        <span className="text-sm text-gray-500">{match.job.location}</span>
                    </p>
                </div>

                <div className="group flex flex-row gap-x-2 mt-2">
                    <div className="flex flex-row gap-x-2">
                        <button onClick={() => removeMatch()}>
                            <TrashIcon className="w-4 h-4 text-gray-400 hover:text-purple-800" />
                        </button>
                        <button onClick={() => toggleShortlist()}>
                            <StarIcon
                                className={
                                    "w-4 h-4 hover:text-purple-800 " +
                                    (match.shortlisted ? "text-purple-800" : "text-gray-400")
                                }
                            />
                        </button>
                        <button onClick={() => toggleApplied()}>
                            <PaperAirplaneIcon
                                className={
                                    "w-4 h-4 hover:text-purple-800 " +
                                    (match.applied ? "text-purple-800" : "text-gray-400")
                                }
                            />
                        </button>
                    </div>
                    <div className="flex-1 text-right">
                        <button
                            onClick={() => onMatchDetails(match)}
                            className={
                                "border border-gray-100 text-gray-400 group-hover:border-transparent group-hover:text-white group-hover:bg-purple-800 text-sm px-1.5 py-0.5 rounded font-semibold"
                            }>
                            <PlusCircleIcon className="w-4 h-4 inline-block -mt-0.5" /> Details
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
