"use client";
import { use, useEffect, useState } from "react";
import Match from "./match";
import { MatchQueryResultWithCount, Match as MatchType } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/client";
import { Description, DialogTitle } from "@headlessui/react";
import Modal from "./modal";
import { Button, SecondaryButton } from "./button";
import { useRouter } from "next/navigation";

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

export default function Matches({ matches }: { matches: any }) {
    const entries = use<MatchQueryResultWithCount>(matches);
    const [matchList, setMatchList] = useState<MatchType[]>([]);
    const [confirmRemoval, setConfirmRemoval] = useState<MatchType | null>(null);
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
            <div className={`container grid grid-cols-1 md:grid-cols-2 gap-4 z-0`}>
                {matchList.map((match: MatchType) => (
                    <Match
                        match={match}
                        key={match.id}
                        onMatchShortlisted={onMatchShortlisted}
                        onMatchApplied={onMatchApplied}
                        onMatchRemoval={setConfirmRemoval}
                    />
                ))}
            </div>
        </div>
    );
}
