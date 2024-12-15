import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";

export default function Prose({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div
                className="prose 
        prose-h1:font-bold prose-headings:text-md prose-headings:text-base
        prose-headings:mb-2 prose-headings:mt-1 prose-p:my-2 prose-p:leading-tight
        prose-a:text-blue-600 prose-p:text-justify prose-img:rounded-xl
        prose-li:my-0.5 min-w-full">
                <Markdown remarkPlugins={[remarkBreaks]}>{children as string}</Markdown>
            </div>
        </>
    );
}
