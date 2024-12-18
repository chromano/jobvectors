import { createClient } from "@/lib/supabase/server";
import { getResumes } from "@/lib/data/resume";
import { getHighestMatchScore, getAllMatches } from "@/lib/data/matches";
import Header from "./header";
import Gauge from "@/components/gauge";
import SkillsCloud from "@/components/skillscloud";

export default async function ResumePage({ searchParams }: { searchParams: any }) {
    const supabase = await createClient();
    const params = await searchParams;

    const user = await supabase.auth.getUser();
    const resumes = await getResumes(supabase, user.data.user && user.data.user.id);
    const activeResume = params.resume || resumes.data[0].id;
    const score = await getHighestMatchScore(activeResume);
    const matches = await getAllMatches(activeResume);
    const resume = resumes.data.find((r: any) => r.id === parseInt(activeResume, 10));

    const response = await supabase.rpc("count_skills");
    const demandedSkills = response.data;
    console.log("xxx", demandedSkills);
    const demandedSkillNames = demandedSkills
        .slice(0, 35)
        .map((skill: any) => skill.skill.toLowerCase());

    return (
        resumes.data.length > 0 &&
        matches.data && (
            <div>
                <Header resumes={resumes.data} />
                <div className="mt-4 flex flex-row gap-4">
                    <div className="w-1/3 max-w-32 mx-auto">
                        <div className="font-semibold text-center mb-2">Score</div>
                        <Gauge perc={score} />
                    </div>
                    <div className="w-1/3 max-w-32 mx-auto">
                        <div className="font-semibold text-center mb-2">Matches</div>
                        <Gauge
                            perc={
                                matches.data.filter((m) => m.score >= 0.5).length /
                                matches.data.length
                            }
                        />
                    </div>
                    <div className="w-1/3 max-w-32 mx-auto">
                        <div className="font-semibold text-center mb-2">Skills</div>
                        <Gauge perc={0.25} />
                    </div>
                </div>

                <div className="mt-6">
                    <p className="font-semibold">Skills Extracted</p>
                    <div className="flex justify-center flex-wrap w-full text-justify pt-4 gap-2">
                        {resume &&
                            resume.skills.sort().map((skill: any) => (
                                <div
                                    key={skill}
                                    className={
                                        "inline-flex text-sm tracking-wide border border-gray-200 text-gray-800 px-1 py-0.5 rounded " +
                                        (demandedSkillNames.indexOf(skill.toLowerCase()) != -1
                                            ? "border-purple-500 "
                                            : "")
                                    }>
                                    {skill}
                                </div>
                            ))}
                    </div>
                </div>

                <div className="mt-6 mb-6">
                    <p className="font-semibold">Demanded Skills</p>

                    <div className="flex justify-center w-full pt-8 px-2">
                        <SkillsCloud skills={demandedSkills.slice(0, 35)} />
                    </div>
                </div>
            </div>
        )
    );
}
