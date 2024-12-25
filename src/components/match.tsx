"use client";
import type { Match } from "@/lib/definitions";
import Score from "./score";
import { TrashIcon, StarIcon, PaperAirplaneIcon, PlusIcon } from "@heroicons/react/24/outline";

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
            <div className="group flex flex-col flex-1 h-full rounded border border-gray-200 dark:border-gray-500 p-2 hover:border-purple-800 dark:hover:border-purple-300 hover:outline hover:outline-purple-800 dark:hover:outline-purple-300">
                <div className="flex justify-between items-start">
                    <h2 className="text-md font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden">
                        {match.job.role}
                    </h2>
                    <Score score={match.score} />
                </div>

                <div className="">
                    <p className="text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                        {match.job.company}{" "}
                        <span className="text-sm text-gray-500">{match.job.location}</span>
                    </p>
                </div>

                <div className="group flex flex-row gap-x-2 mt-2">
                    <div className="flex flex-row gap-x-2">
                        <button onClick={() => removeMatch()}>
                            <TrashIcon className="w-4 h-4 text-gray-400 hover:text-purple-800 dark:hover:text-purple-400" />
                        </button>
                        <button onClick={() => toggleShortlist()}>
                            <StarIcon
                                className={
                                    "w-4 h-4 hover:text-purple-800 dark:hover:text-purple-400 " +
                                    (match.shortlisted
                                        ? "text-purple-800 dark:text-purple-400"
                                        : "text-gray-400")
                                }
                            />
                        </button>
                        <button onClick={() => toggleApplied()}>
                            <PaperAirplaneIcon
                                className={
                                    "w-4 h-4 hover:text-purple-800 dark:hover:text-purple-400 " +
                                    (match.applied
                                        ? "text-purple-800 dark:text-purple-400"
                                        : "text-gray-400")
                                }
                            />
                        </button>
                    </div>
                    <div className="flex-1 text-right">
                        <button
                            onClick={() => onMatchDetails(match)}
                            className={
                                " text-gray-400 group-hover:border-transparent hover:text-purple-800 text-sm px-1.5 py-0.5 rounded font-semibold"
                            }>
                            <PlusIcon className="w-3 h-3 inline-block -mt-0.5" /> Details
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
