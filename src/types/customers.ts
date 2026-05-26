import type { Dispatch, SetStateAction } from 'react';

export type Customer = {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive' | 'banned';
    created_at: string;
};

export type UpdateCustomer = Partial<Omit<Customer, 'id' | 'created_at'>>;

export type PaginationTypes = {
    page: number;
    totalPages: number;
    setPage: Dispatch<SetStateAction<number>>;
};
