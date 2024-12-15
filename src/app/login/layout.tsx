import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Jobvectors",
    description: "Resume optimization and jobs matching",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
