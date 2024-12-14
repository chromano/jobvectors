type Match = {
    id: string;
    score: number;
    shortlisted: boolean;
    applied: boolean;
    job: {
        role: string;
        company: string;
        location: string;
    };
};

type MatchQueryResultWithCount = {
    data: Array<Match>;
    count: number;
};

export type { Match, MatchQueryResultWithCount };
