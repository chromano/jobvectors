"use client";
import { useState, ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function UploadResume() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const supabase = createClient();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("resume", file);

        const { data, error } = await supabase.functions.invoke("resumes", {
            body: formData,
        });

        setUploading(false);

        if (error) {
            console.error("Error uploading file:", error.message);
        } else {
            console.log("File uploaded successfully:", data);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                onClick={handleUpload}
                className={`px-4 py-2 rounded text-white ${
                    uploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
                }`}
                disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
}
