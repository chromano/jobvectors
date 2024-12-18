import { createClient } from "@/lib/supabase/server";
import { getResume, getResumes } from "@/lib/data/resume";
import { getHighestMatchScore, getAllMatches } from "@/lib/data/matches";
import Header from "./header";
import SkillsCloud from "@/components/skillscloud";
import Scores from "./scores";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default async function ResumePage({ searchParams }: { searchParams: any }) {
    const supabase = await createClient();
    const params = await searchParams;

    const user = await supabase.auth.getUser();
    const resumes = getResumes(supabase, user.data.user && user.data.user.id);
    let resume, score, matches;

    if (params.resume) {
        resume = await getResume(supabase, params.resume);
        score = getHighestMatchScore(params.resume);
        matches = getAllMatches(params.resume);
    }

    const demandedSkills = await supabase.rpc("count_skills");

    const demandedSkillNames = demandedSkills.data
        .slice(0, 35)
        .map((skill: any) => skill.skill.toLowerCase());

    return (
        <div>
            <Header resumes={resumes} />

            {params.resume && (
                <Suspense key={Date.now()} fallback={<Loading />}>
                    <>
                        <Scores
                            resume={resume}
                            matches={matches}
                            score={score}
                            demandedSkills={demandedSkills}
                        />
                        <div className="mt-6">
                            <p className="font-semibold">Skills Extracted</p>
                            <div className="flex justify-center flex-wrap w-full text-justify pt-4 gap-2">
                                {resume &&
                                    resume.data.skills.sort().map((skill: any) => (
                                        <div
                                            key={skill}
                                            className={
                                                "inline-flex text-sm tracking-wide border border-gray-200 text-gray-800 px-1 py-0.5 rounded " +
                                                (demandedSkillNames.indexOf(skill.toLowerCase()) !=
                                                -1
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
                                <SkillsCloud skills={demandedSkills.data.slice(0, 35)} />
                            </div>
                        </div>
                    </>
                </Suspense>
            )}
        </div>
    );
}
