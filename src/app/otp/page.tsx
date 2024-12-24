import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Otp({ searchParams }: { searchParams: URLSearchParams }) {
    const supabase = await createClient();

    await supabase.auth.verifyOtp({
        token_hash: searchParams.get("code")!,
        email: searchParams.get("email")!,
        type: "email",
    });

    supabase.auth.getUser().then((response) => {
        if (response.data?.user) {
            redirect("/vectors");
        }
    });

    return <div />;
}
