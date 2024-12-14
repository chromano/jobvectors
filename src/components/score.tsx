export default function Score({ score }: { score: number }) {
    const color = score > 0.7 ? "bg-green-700" : score > 0.5 ? "bg-blue-700" : "bg-red-700";
    return (
        <div className="relative group/score inline-block space-x-0.5 align-middle whitespace-nowrap">
            <div className="hidden group-hover/score:block absolute -bottom-8 z-50 border text-sm px-1 rounded border-purple-800">
                {Math.round(score * 100)}%
            </div>
            <span
                className={`inline-flex rounded ${
                    score > 0.2 ? color : "bg-purple-100"
                } w-2 h-2`}></span>
            <span
                className={`inline-flex rounded ${
                    score > 0.4 ? color : "bg-purple-100"
                } w-2 h-2`}></span>
            <span
                className={`inline-flex rounded ${
                    score > 0.5 ? color : "bg-purple-100"
                } w-2 h-2`}></span>
            <span
                className={`inline-flex rounded ${
                    score > 0.8 ? color : "bg-purple-100"
                } w-2 h-2`}></span>
        </div>
    );
}
