import { createClient } from "@/lib/supabase/server";
import { getResume, getResumes } from "@/lib/data/resume";
import { getHighestMatchScore, getAllMatches } from "@/lib/data/matches";
import Header from "./header";
import SkillsCloud from "@/components/skillscloud";
import Scores from "./scores";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { cookies } from "next/headers";

export default async function ResumePage() {
    const supabase = await createClient();

    const user = await supabase.auth.getUser();
    const resumes = getResumes(supabase, user.data.user && user.data.user.id);
    let resume, score, matches;
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get("resume");
    const resumeId = cookieValue && cookieValue.value;

    if (resumeId) {
        resume = await getResume(supabase, resumeId);
        score = getHighestMatchScore(resumeId);
        matches = getAllMatches(resumeId);
    }

    const demandedSkills = await supabase.rpc("count_skills");

    const demandedSkillNames = demandedSkills.data
        .slice(0, 35)
        .map((skill: any) => skill.skill.toLowerCase());

    return (
        <div className="text-gray-800 dark:text-gray-200">
            <Header resumes={resumes} />

            {resume && (
                <Suspense key={Date.now()} fallback={<Loading />}>
                    <>
                        <Scores
                            resume={resume}
                            matches={matches}
                            score={score}
                            demandedSkills={demandedSkills}
                        />
                        <div className="mt-6">
                            <p className="font-semibold mb-4">Skills Extracted</p>
                            <div className="flex flex-wrap w-full justify-between gap-2">
                                {resume &&
                                    resume.data.skills.sort().map((skill: any) => (
                                        <div
                                            key={skill}
                                            className={
                                                "inline-flex text-sm tracking-wide border  text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded " +
                                                (demandedSkillNames.indexOf(skill.toLowerCase()) !=
                                                -1
                                                    ? "border-purple-500 dark:border-purple-400 "
                                                    : "border-gray-200 dark:border-gray-700")
                                            }>
                                            {skill}
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="mt-6 mb-6">
                            <p className="font-semibold mb-4">Demanded Skills</p>

                            <div className="flex w-full">
                                <SkillsCloud skills={demandedSkills.data.slice(0, 35)} />
                            </div>
                        </div>
                    </>
                </Suspense>
            )}
        </div>
    );
}
