import Image from "next/image";
import thinkingface from "@/../public/thinkingface.svg";

export default function Empty() {
    return (
        <div className="flex flex-row gap-4">
            <Image src={thinkingface} alt="No content available" className="w-6" />
            <div className="text-gray-500">Nothing to show here (temporarily).</div>
        </div>
    );
}
