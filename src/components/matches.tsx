"use client";
import { use, useEffect, useState } from "react";
import Match from "./match";
import { MatchQueryResultWithCount, Match as MatchType } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/client";
import { Description, DialogTitle } from "@headlessui/react";
import Modal from "./modal";
import { Button, SecondaryButton } from "./button";
import { useRouter } from "next/navigation";
import Prose from "./prose";

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

    return (
        <Modal isOpen={isOpen} onClose={() => onClose(null)}>
            <DialogTitle className="font-bold text-lg whitespace-nowrap overflow-x-hidden text-ellipsis">
                {match?.job.role} at {match?.job.company}
            </DialogTitle>
            <Description>
                <div className="flex justify-center mb-4">
                    <button
                        className={`py-2 ${
                            activeTab === "Posting" ? "border-b-2 border-purple-800" : ""
                        }`}
                        onClick={() => setActiveTab("Posting")}>
                        Posting
                    </button>
                    <button
                        className={`px-4 py-2 ${
                            activeTab === "Coverletter" ? "border-b-2 border-purple-800" : ""
                        }`}
                        onClick={() => setActiveTab("Coverletter")}>
                        Coverletter
                    </button>
                </div>
                <div className="mb-4">
                    {activeTab === "Posting" && (
                        <div className="overflow-y-auto overflow-x-hidden h-full mb-4">
                            <p>
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
                            <div className="mt-4 max-h-72">
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
                        <div className="overflow-y-auto overflow-x-hidden h-full mb-4"></div>
                    )}
                </div>
            </Description>
            <div className="flex justify-end gap-4">
                <SecondaryButton onClick={() => onClose(null)}>Close</SecondaryButton>
            </div>
        </Modal>
    );
};

export default function Matches({ matches }: { matches: any }) {
    const entries = use<MatchQueryResultWithCount>(matches);
    const [matchList, setMatchList] = useState<MatchType[]>([]);
    const [confirmRemoval, setConfirmRemoval] = useState<MatchType | null>(null);
    const [matchDetails, setMatchDetails] = useState<MatchType | null>(null);
    const router = useRouter();

    const supabase = createClient();

    useEffect(() => {
        setMatchList(entries?.data);
    }, [entries]);

    const onMatchShortlisted = async (match: MatchType) => {
        match.shortlisted = !match.shortlisted;

        await supabase
            .from("matches")
            .update({ shortlisted: match.shortlisted })
            .eq("id", match.id);
        setMatchList([...matchList]);
        router.refresh();
    };

    const onMatchApplied = async (match: MatchType) => {
        match.applied = !match.applied;

        await supabase.from("matches").update({ applied: match.applied }).eq("id", match.id);
        setMatchList([...matchList]);
        router.refresh();
    };

    const onRemovalConfirmed = async (match: MatchType) => {
        setConfirmRemoval(null);
        await supabase.from("matches").update({ dismissed: true }).eq("id", match.id);
        setMatchList(matchList.filter((m) => m.id !== match.id));
        router.refresh();
    };

    const onMatchDetails = (match: MatchType) => {
        console.log("Match details", match);
        setMatchDetails(match);
    };

    return (
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
            <div className={`container grid grid-cols-1 md:grid-cols-2 gap-4 z-0`}>
                {matchList.map((match: MatchType) => (
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
        </div>
    );
}
