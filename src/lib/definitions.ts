type Match = {
    id: string;
    job: {
        role: string;
        company: string;
        location: string;
    };
};

type QueryResultWithCount = {
    data: Array<any>;
    count: number;
};

export type { Match, QueryResultWithCount };
