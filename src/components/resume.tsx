"use client";
import React, { use, useState, useEffect, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function ResumeForm({ onComplete }: { onComplete: (id: string | number) => void }) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!title || !file) {
            setError("Please fill in all fields.");
            setMessage("");
            return;
        }
        setError("");
        setMessage("");

        setUploading(true);
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("title", title);

        const { data, error } = await supabase.functions.invoke("resumes", {
            body: formData,
        });

        setUploading(false);

        if (error) {
            console.error("Error uploading file:", error.message);
        } else {
            console.log("File uploaded successfully:", data);
            onComplete(data.id);
        }

        // Handle form submission logic here
        setMessage("Form submitted successfully!");
        setError("");
    };

    return (
        <div className="w-full rounded">
            <form inert={uploading} onSubmit={handleSubmit} className="">
                {error && <p className="text-red-500 my-2">{error}</p>}
                {message && <p className="text-green-700 my-2">{message}</p>}

                <div className="mb-4">
                    <input
                        id="title"
                        type="text"
                        value={title}
                        placeholder="The resume label"
                        onChange={(e) => setTitle(e.target.value)}
                        className="appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline focus:outline-gray-600"
                    />
                </div>
                <div className="mb-6">
                    <input
                        id="file"
                        type="file"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className="flex w-full rounded bg-background text-gray-400 file:text-gray-600 transition-colors file:border-0 file:bg-gray-200 file:text-foreground file:mr-2 file:px-2 file:hover:cursor-pointer file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-gray-600 focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline disabled:bg-purple-100"
                        disabled={uploading}>
                        {uploading ? (
                            <div className="inline text-purple-800">
                                <svg
                                    className="inline animate-spin mr-3 h-5 w-5 text-purple-800"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>{" "}
                                Processing
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
import { useCookies } from "react-cookie";

function ResumeDropdown({ resumes, initial }: { resumes: any; initial: any }) {
    const [selected, setSelected] = useState<any | null>();
    const router = useRouter();
    const [cookies, setCookie] = useCookies(["resume"]);

    const resumeId = cookies.resume || initial;
    const resumeList: { data: { id: number }[] } = use(resumes);

    useEffect(() => {
        if (!resumeId) {
            return;
        }
        const resume = resumeList.data.find((r) => r.id === parseInt(resumeId, 10));
        if (resume) {
            setSelected(resume);
        }
    }, [resumeId, resumeList]);

    const onChange = (resume: any) => {
        setSelected(resume);

        setCookie("resume", resume.id, { path: "/" });
        router.refresh();
    };

    return (
        resumeList.data && (
            <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                    <Menu.Button className="inline-flex justify-between w-full rounded ring-1 ring-gray-300 px-2 py-1 bg-white font-medium text-gray-500 hover:bg-gray-50">
                        {({ open }) =>
                            open ? (
                                <>
                                    {selected?.id ? (
                                        <span className="text-gray-800">{selected.title}</span>
                                    ) : (
                                        "Select"
                                    )}
                                    <ChevronUpIcon className="text-gray-400 w-4 h-4 mt-1" />
                                </>
                            ) : (
                                <>
                                    {selected?.id ? (
                                        <span className="text-gray-800">{selected.title}</span>
                                    ) : (
                                        "Select"
                                    )}
                                    <ChevronDownIcon className="text-gray-400 w-4 h-4 mt-1" />
                                </>
                            )
                        }
                    </Menu.Button>
                </div>
                <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-full p-1 rounded bg-white border border-gray-300 ring-opacity-50 focus:outline-none">
                    <div className="overflow-hidden overflow-y-scroll max-h-64">
                        {resumeList.data.map((resume: any) => (
                            <Menu.Item key={resume.id}>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setSelected(resume);
                                            onChange(resume);
                                        }}
                                        className={`${
                                            active ? "bg-purple-100 text-gray-900" : "text-gray-700"
                                        }  group flex rounded items-center w-[calc(100%-3px)] px-2 py-1`}>
                                        {resume.title}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Menu>
        )
    );
}

export { ResumeForm, ResumeDropdown };
