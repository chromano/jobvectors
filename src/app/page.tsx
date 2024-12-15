import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const supabase = await createClient();
    const response = await supabase.auth.getUser();

    if (response.error) {
        redirect("/login");
    } else {
        redirect("/vectors");
    }
}
