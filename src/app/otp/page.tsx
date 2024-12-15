"use client";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Otp() {
    const supabase = createClient();

    supabase.auth.getSession().then((response) => {
        if (response.data?.session?.user) {
            redirect("/vectors");
        }
    });

    return <div />;
}
