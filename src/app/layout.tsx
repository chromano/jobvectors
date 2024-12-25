import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Jobvectors",
    description: "Resume optimization and jobs matching",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased dark:bg-slate-800`}>{children}</body>
        </html>
    );
}
