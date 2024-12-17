import { createClient } from "@/lib/supabase/server";
import { getResumes } from "@/lib/data/resume";
import Header from "./header";

export default async function ResumePage() {
    const supabase = await createClient();

    const user = await supabase.auth.getUser();
    const resumes = await getResumes(supabase, user.data.user && user.data.user.id);

    return resumes.data.length > 0 && <Header resumes={resumes.data} />;
}
