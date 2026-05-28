export default function usePagination<T>(
    data: T[],
    page: number,
    itemsPerPage: number,
) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginated = data.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage,
    );
    return { totalPages, paginated };
}
