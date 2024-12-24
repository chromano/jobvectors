"use client";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default async function Otp() {
    const supabase = createClient();

    supabase.auth.getUser().then((response) => {
        if (response.data?.user) {
            redirect("/vectors");
        }
    });

    return <div />;
}
