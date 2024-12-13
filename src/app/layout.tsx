import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Sidebar from "@/components/sidebar";
import "./globals.css";

const nunitoSans = Quicksand({
    variable: "--font-nunito-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Jobvectors",
    description: "Resume optimization and jobs matching",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${nunitoSans.variable} antialiased`}>
                <div className="w-full lg:w-4/5 mx-auto font-[family-name:var(--font-geist-sans)]">
                    <div className="flex flex-1 flex-row gap-2">
                        <div className="hidden md:flex w-2/5 lg:w-1/3 h-screen sticky top-0 mx-2">
                            <Sidebar />
                        </div>
                        <main className="w-full mt-8">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
