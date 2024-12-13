import Image from "next/image";

export default function Logo() {
    return (
        <Image
            className="dark:invert rounded"
            src="/silhouette.svg"
            alt="Jobvectors logo"
            width={128}
            height={128}
            priority
        />
    );
}
