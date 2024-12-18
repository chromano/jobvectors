"use client";
import { ResumeForm } from "@/components/resume";
import Modal from "@/components/modal";
import { ResumeDropdown } from "@/components/resume";
import { DialogTitle } from "@headlessui/react";
import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SecondaryButton } from "@/components/button";
import { useRouter } from "next/navigation";

const NewResume = ({
    isOpen,
    onResumeCreated,
}: {
    isOpen: boolean;
    onResumeCreated: (id: string | number) => void;
}) => {
    const onComplete = (id: string | number) => {
        onResumeCreated(id);
    };

    return (
        <div className="w-20">
            <Modal isOpen={isOpen} size="w-1/3" onClose={() => null}>
                <>
                    <DialogTitle className="font-bold text-lg whitespace-nowrap overflow-x-hidden text-ellipsis mb-4">
                        New Resume
                    </DialogTitle>
                    <ResumeForm onComplete={onComplete} />
                </>
            </Modal>
        </div>
    );
};

const Header = ({ resumes }: { resumes: any }) => {
    const params = useSearchParams();
    const router = useRouter();
    const currentParams = new URLSearchParams(params.toString());

    const [resumeFormOpened, setResumeFormOpened] = useState(false);

    const onNewResume = () => {
        setResumeFormOpened(true);
    };

    const onResumeCreated = (id: string | number) => {
        setResumeFormOpened(false);
        currentParams.set("resume", id.toString());
        router.replace(`?${currentParams.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <div className="flex w-full flex-row gap-2">
                <ResumeDropdown resumes={resumes} initial={params.get("resume")} />
                <SecondaryButton onClick={onNewResume}>New Resume</SecondaryButton>
            </div>
            <NewResume isOpen={resumeFormOpened} onResumeCreated={onResumeCreated} />
        </div>
    );
};

export default Header;
