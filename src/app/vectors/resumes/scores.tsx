import Gauge from "@/components/gauge";
import { use } from "react";

export default function Scores({
    resume,
    matches,
    score,
    demandedSkills,
}: {
    resume: any;
    matches: any;
    score: any;
    demandedSkills: any;
}) {
    const resumeData: any = resume;
    const matchesData: any = use(matches);
    const demandedSkillsData: any = demandedSkills;
    const scoreData: number = use(score);

    const demandedSkillNames = demandedSkillsData.data
        .slice(0, 35)
        .map((skill: any) => skill.skill.toLowerCase());

    return (
        <>
            <div className="mt-4 flex flex-row gap-4">
                <div className="w-1/3 max-w-32 mx-auto">
                    <div className="font-semibold text-center mb-2">Score</div>
                    <Gauge perc={scoreData} />
                </div>
                <div className="w-1/3 max-w-32 mx-auto">
                    <div className="font-semibold text-center mb-2">Matches</div>
                    <Gauge
                        perc={
                            (matchesData &&
                                matchesData.data &&
                                matchesData.data.filter((m: any) => m.score >= 0.5).length /
                                    matchesData.data.length) ||
                            0
                        }
                    />
                </div>
                <div className="w-1/3 max-w-32 mx-auto">
                    <div className="font-semibold text-center mb-2">Skills</div>
                    <Gauge
                        perc={
                            resumeData.data.skills.filter(
                                (s: string) => demandedSkillNames.indexOf(s.toLowerCase()) != -1,
                            ).length / demandedSkillNames.length
                        }
                    />
                </div>
            </div>
        </>
    );
}
