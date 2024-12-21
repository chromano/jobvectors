type Match = {
    id: string;
    score: number;
    shortlisted: boolean;
    applied: boolean;
    created_at: Date;
    job: {
        role: string;
        company: string;
        location: string;
        source: string;
        description: string;
        apply_at: string;
    };
};

type MatchQueryResultWithCount = {
    data: Array<Match>;
    count: number;
};

export type { Match, MatchQueryResultWithCount };
