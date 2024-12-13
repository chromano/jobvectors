import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen w-full text-center font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 items-center">
                <Image
                    className="dark:invert rounded m-4 animate-pulse outline outline-purple-800"
                    src="/silhouette.svg"
                    alt="Jobvectors logo"
                    width={200}
                    height={200}
                    priority
                />
                <div className="w-full font-[family-name:var(--font-nunito-sans)]">
                    <p className="text-4xl mx-auto font-semibold text-purple-800">Hello world!</p>
                </div>
            </main>
        </div>
    );
}
