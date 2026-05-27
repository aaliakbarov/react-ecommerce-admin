import type { Dispatch, SetStateAction } from 'react';

export type PaginationTypes = {
    page: number;
    totalPages: number;
    setPage: Dispatch<SetStateAction<number>>;
};
