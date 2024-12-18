import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/data/user";
import "../globals.css";

export const metadata: Metadata = {
    title: "Jobvectors",
    description: "Resume optimization and jobs matching",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const user = await getUser(supabase);

    return (
        <div className="w-full lg:w-4/5 mx-auto font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-1 flex-row">
                <div className="hidden md:flex w-2/5 lg:w-1/3 h-screen sticky top-0 mx-2">
                    <Sidebar user={user} />
                </div>
                <main className="w-full m-4">{children}</main>
            </div>
        </div>
    );
}
