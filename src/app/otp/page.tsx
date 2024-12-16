import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Otp() {
    const supabase = await createClient();

    supabase.auth.getUser().then((response) => {
        if (response.data?.user) {
            redirect("/vectors");
        }
    });

    return <div />;
}
