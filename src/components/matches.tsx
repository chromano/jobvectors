"use client";
import { use, useEffect, useState, useTransition } from "react";
import Match from "./match";
import { Match as MatchType } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/client";
import { Description, DialogTitle } from "@headlessui/react";
import Modal from "./modal";
import { Button, SecondaryButton } from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import Prose from "./prose";
import Pagination from "@/components/pagination";
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
    <Modal size="w-1/2" isOpen={isOpen} onClose={() => onClose(null)}>
        <DialogTitle className="font-bold">Match Removal</DialogTitle>
        <Description>
            <p className="text-gray-800 dark:text-gray-200">
                This will permanently remove the match. You can always keep a shortlist of relevant
                matches instead of deleting irrelevant ones.
            </p>
        </Description>
        <div className="flex justify-end gap-4">
            <Button onClick={() => onClose(null)}>Cancel</Button>
            <SecondaryButton onClick={() => onClose(match)}>Remove</SecondaryButton>
        </div>
    </Modal>
);

export const MatchDetails = ({
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
        <Modal size="w-1/2" isOpen={isOpen} onClose={close}>
            <div className="flex flex-col h-full gap-y-4">
                <DialogTitle className="flex-none font-bold text-lg whitespace-nowrap overflow-x-hidden text-ellipsis text-gray-800 dark:text-gray-200">
                    {match?.job.role} at {match?.job.company}
                </DialogTitle>
                <div className="w-full flex-col grow">
                    <div className="flex-none text-center mb-4">
                        <button
                            className={`py-0 px-4 font-semibold text-purple-800 dark:text-purple-200 ${
                                activeTab === "Posting" &&
                                "bg-purple-100 dark:text-gray-800 text-purple-800 rounded-full"
                            }
                        }`}
                            onClick={() => setActiveTab("Posting")}>
                            Posting
                        </button>
                        <button
                            className={`px-4 py-1 font-semibold text-purple-800 dark:text-purple-200 ${
                                activeTab === "Coverletter" &&
                                "bg-purple-100 dark:text-gray-800 text-purple-800 rounded-full"
                            }`}
                            onClick={() => setActiveTab("Coverletter")}>
                            Coverletter
                        </button>
                    </div>
                    <div className="grow">
                        {activeTab === "Posting" && (
                            <div className="overflow-y-auto">
                                <div className="overflow-y-auto overflow-x-hidden">
                                    <div className="flex flex-row gap-x-4 mb-4 text-gray-600 dark:text-gray-200">
                                        <p className="whitespace-nowrap">
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

                                        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                                            <strong>Location:</strong> {match?.job.location}
                                        </p>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-200">
                                        <Prose>{match?.job.description}</Prose>
                                    </div>
                                    <div className="flex flex-row gap-x-4 text-gray-600 dark:text-gray-200">
                                        <p className="">
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
                            </div>
                        )}
                        {activeTab === "Coverletter" && (
                            <div className="w-full h-full overflow-y-auto overflow-x-hidden mb-4">
                                {coverletter ? <Prose>{coverletter}</Prose> : <div>Loading</div>}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-none text-right">
                    <SecondaryButton onClick={close}>Close</SecondaryButton>
                </div>
            </div>
        </Modal>
    );
};

export default function Matches({ matches, itemsPerPage }: { matches: any; itemsPerPage: number }) {
    const searchParams = useSearchParams();
    const matchList = matches && use(matches);
    const [confirmRemoval, setConfirmRemoval] = useState<MatchType | null>(null);
    const [matchDetails, setMatchDetails] = useState<MatchType | null>(null);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onMatchShortlisted = (match: MatchType) => {
        shortlistMatch(match.id, !match.shortlisted);
        startTransition(() => {
            router.refresh();
        });
    };

    const onMatchApplied = async (match: MatchType) => {
        applyMatch(match.id, !match.applied);
        startTransition(() => {
            router.refresh();
        });
    };

    const onRemovalConfirmed = (match: MatchType) => {
        setConfirmRemoval(null);
        dismissMatch(match.id);
        startTransition(() => {
            router.refresh();
        });
    };

    const onMatchDetails = (match: MatchType) => {
        setMatchDetails(match);
    };

    return (
        <div className="flex flex-col gap-y-4">
            {isPending && <Loading />}
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
            {matchList && matchList.data && (
                <>
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
                </>
            )}
        </div>
    );
}
