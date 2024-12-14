import type { Match } from "@/lib/definitions";
import Score from "./score";

export default function Match({ match }: { match: Match }) {
    return (
        <>
            <div className="group flex flex-col flex-1 h-full bg-white rounded border border-gray-200 p-4 transition-shadow duration-300 hover:border-purple-800 hover:outline hover:outline-purple-800">
                <div className="flex justify-between items-start">
                    <h2 className="text-md font-bold text-gray-800 whitespace-nowrap text-ellipsis overflow-hidden">
                        {match.job.role}
                    </h2>
                    <Score score={match.score} />
                </div>

                <div className="mb-4">
                    <p className="text-gray-600 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                        {match.job.company}{" "}
                        <span className="text-sm text-gray-500">{match.job.location}</span>
                    </p>
                </div>
            </div>
        </>
    );
}
