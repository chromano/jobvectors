import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Otp({ searchParams }: { searchParams: any }) {
    const supabase = await createClient();
    const params = await searchParams;

    await supabase.auth.verifyOtp({
        token_hash: params.get("code")!,
        email: params.get("email")!,
        type: "email",
    });

    supabase.auth.getUser().then((response) => {
        if (response.data?.user) {
            redirect("/vectors");
        }
    });

    return <div />;
}
