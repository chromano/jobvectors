import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
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
            <body className={`${nunitoSans.variable} antialiased`}>{children}</body>
        </html>
    );
}
