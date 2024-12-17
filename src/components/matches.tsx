"use client";
import { useEffect, useState } from "react";
import Match from "./match";
import { Match as MatchType } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/client";
import { Description, DialogTitle } from "@headlessui/react";
import Modal from "./modal";
import { Button, SecondaryButton } from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import Prose from "./prose";
import Pagination from "@/components/pagination";
import { ResumeDropdown } from "@/components/resume";
import { applyMatch, dismissMatch, shortlistMatch } from "@/lib/data/matches";
import Loading from "@/components/loading";

const RemovalConfirmation = ({
    isOpen,
    onClose,
    match,
}: {
    isOpen: boolean;
    onClose: (match: MatchType | null) => void;
    match: MatchType | null;
}) => (
    <Modal isOpen={isOpen} onClose={() => onClose(null)}>
        <DialogTitle className="font-bold">Match Removal</DialogTitle>
        <Description>
            This will permanently remove the match. You can always keep a shortlist of relevant
            matches instead of deleting irrelevant ones.
        </Description>
        <div className="flex justify-end gap-4">
            <Button onClick={() => onClose(null)}>Cancel</Button>
            <SecondaryButton onClick={() => onClose(match)}>Remove</SecondaryButton>
        </div>
    </Modal>
);

const MatchDetails = ({
    isOpen,
    onClose,
    match,
}: {
    isOpen: boolean;
    onClose: (match: MatchType | null) => void;
    match: MatchType | null;
}) => {
    const [activeTab, setActiveTab] = useState("Posting");
    const [coverletter, setCoverletter] = useState("");
    const supabase = createClient();

    useEffect(() => {
        if (activeTab === "Coverletter" && !coverletter && match) {
            supabase.functions
                .invoke("coverletters", {
                    body: { matchId: match.id },
                })
                .then((response) => {
                    setCoverletter(response.data.coverLetter);
                });
        } else {
            setCoverletter("");
        }
    }, [activeTab, match]); // eslint-disable-line

    const close = () => {
        setActiveTab("Posting");
        onClose(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <DialogTitle className="font-bold text-lg whitespace-nowrap overflow-x-hidden text-ellipsis">
                {match?.job.role} at {match?.job.company}
            </DialogTitle>
            <div>
                <div className="flex justify-center mb-4">
                    <button
                        className={`py-0 px-4 font-semibold ${
                            activeTab === "Posting"
                                ? "bg-purple-800 text-white rounded-full"
                                : "text-purple-800"
                        }`}
                        onClick={() => setActiveTab("Posting")}>
                        Posting
                    </button>
                    <button
                        className={`px-4 py-1 font-semibold ${
                            activeTab === "Coverletter"
                                ? "bg-purple-800 text-white rounded-full"
                                : "text-purple-800"
                        }`}
                        onClick={() => setActiveTab("Coverletter")}>
                        Coverletter
                    </button>
                </div>
                <div className="mb-4">
                    {activeTab === "Posting" && (
                        <div className="h-full mb-4">
                            <div className="flex flex-row gap-x-2 pr-4">
                                <p className="flex-1">
                                    <strong>Location:</strong> {match?.job.location}
                                </p>
                                <p>
                                    <strong>Source:</strong>{" "}
                                    <a
                                        className="text-blue-500 hover:underline"
                                        target="_blank"
                                        href={
                                            "https://news.ycombinator.com/item?id=" +
                                            match?.job.source.split("-")[1]
                                        }>
                                        HackerNews
                                    </a>
                                </p>
                            </div>
                            <div className="mt-4 max-h-72 overflow-y-scroll overflow-x-hidden pr-4">
                                <Prose>{match?.job.description}</Prose>
                                <p className="mt-4">
                                    <strong>Apply:</strong>{" "}
                                    <a
                                        href={match?.job.apply_at}
                                        target="_blank"
                                        className="text-blue-500 hover:underline">
                                        {match?.job.apply_at}
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                    {activeTab === "Coverletter" && (
                        <div className="overflow-y-auto overflow-x-hidden max-h-72 mb-4">
                            {coverletter ? (
                                <Prose>{coverletter}</Prose>
                            ) : (
                                <Loading hideLabel={true} />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <SecondaryButton onClick={() => onClose(null)}>Close</SecondaryButton>
            </div>
        </Modal>
    );
};

export default function Matches({
    resumes,
    matches,
    itemsPerPage,
}: {
    resumes: { id: number; title: string }[] | null;
    matches: any;
    itemsPerPage: number;
}) {
    const searchParams = useSearchParams();
    const [matchList, setMatchList] = useState<any>();
    const [confirmRemoval, setConfirmRemoval] = useState<MatchType | null>(null);
    const [matchDetails, setMatchDetails] = useState<MatchType | null>(null);
    const [activeResume, setActiveResume] = useState<any>();
    const page = parseInt(searchParams.get("page") || "0", 10);
    const router = useRouter();

    useEffect(() => {
        if (resumes && resumes.length > 0) {
            setActiveResume(resumes[0]);
        }
        setMatchList(matches);
    }, [matches, resumes]);

    const onMatchShortlisted = (match: MatchType) => {
        shortlistMatch(match.id, !match.shortlisted);
        router.refresh();
    };

    const onMatchApplied = async (match: MatchType) => {
        applyMatch(match.id, !match.applied);
        router.refresh();
    };

    const onRemovalConfirmed = (match: MatchType) => {
        setConfirmRemoval(null);
        dismissMatch(match.id);
        router.refresh();
    };

    const onMatchDetails = (match: MatchType) => {
        console.log("Match details", match);
        setMatchDetails(match);
    };

    return (
        matchList &&
        matchList.data && (
            <div className="flex flex-col gap-y-4">
                <RemovalConfirmation
                    match={confirmRemoval}
                    isOpen={!!confirmRemoval}
                    onClose={(confirm) =>
                        confirm && confirmRemoval
                            ? onRemovalConfirmed(confirmRemoval)
                            : setConfirmRemoval(null)
                    }
                />
                <MatchDetails
                    match={matchDetails}
                    onClose={() => setMatchDetails(null)}
                    isOpen={!!matchDetails}
                />
                <ResumeDropdown
                    resumes={resumes && resumes.length > 0 ? resumes : []}
                    initial={activeResume}
                />

                <div className={`container grid grid-cols-1 md:grid-cols-2 gap-4 z-0`}>
                    {matchList.data.map((match: MatchType) => (
                        <Match
                            match={match}
                            key={match.id}
                            onMatchShortlisted={onMatchShortlisted}
                            onMatchApplied={onMatchApplied}
                            onMatchRemoval={setConfirmRemoval}
                            onMatchDetails={onMatchDetails}
                        />
                    ))}
                </div>
                <Pagination page={page} items={matchList} itemsPerPage={itemsPerPage} />
            </div>
        )
    );
}
