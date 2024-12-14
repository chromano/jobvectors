type Match = {
    id: string;
    score: number;
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
