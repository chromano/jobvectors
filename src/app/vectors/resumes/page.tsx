import { createClient } from "@/lib/supabase/server";
import { getResume, getResumes } from "@/lib/data/resume";
import { getHighestMatchScore, getAllMatches } from "@/lib/data/matches";
import Header from "./header";
import Gauge from "@/components/gauge";
import SkillsCloud from "@/components/skillscloud";

export default async function ResumePage({ searchParams }: { searchParams: any }) {
    const supabase = await createClient();
    const params = await searchParams;

    const user = await supabase.auth.getUser();
    const resumes = getResumes(supabase, user.data.user && user.data.user.id);
    let resume, score, matches;

    if (params.resume) {
        resume = await getResume(supabase, params.resume);
        resume = resume.data;
        score = await getHighestMatchScore(resume.id);
        matches = await getAllMatches(resume.id);
    }

    const response = await supabase.rpc("count_skills");
    const demandedSkills = response.data;

    const demandedSkillNames = demandedSkills
        .slice(0, 35)
        .map((skill: any) => skill.skill.toLowerCase());

    return (
        <div>
            <Header resumes={resumes} />
            {resume && (
                <>
                    <div className="mt-4 flex flex-row gap-4">
                        <div className="w-1/3 max-w-32 mx-auto">
                            <div className="font-semibold text-center mb-2">Score</div>
                            <Gauge perc={score} />
                        </div>
                        <div className="w-1/3 max-w-32 mx-auto">
                            <div className="font-semibold text-center mb-2">Matches</div>
                            <Gauge
                                perc={
                                    matches?.data.filter((m) => m.score >= 0.5).length /
                                    matches.data.length
                                }
                            />
                        </div>
                        <div className="w-1/3 max-w-32 mx-auto">
                            <div className="font-semibold text-center mb-2">Skills</div>
                            <Gauge
                                perc={
                                    resume.skills.filter(
                                        (s) => demandedSkillNames.indexOf(s.toLowerCase()) != -1,
                                    ).length / demandedSkillNames.length
                                }
                            />
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
                </>
            )}
        </div>
    );
}
