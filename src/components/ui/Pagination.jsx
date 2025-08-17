import { Button } from './button';

export default function Pagination({ pagination }) {
    return (
        <div className='flex justify-between items-center mt-4'>
            <p className='text-sm text-muted-foreground'>
                Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className='space-x-2'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                        pagination.setPage((p) => Math.max(p - 1, 1))
                    }
                    disabled={pagination.page === 1}
                >
                    Previous
                </Button>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                        pagination.setPage((p) =>
                            Math.min(p + 1, pagination.totalPages)
                        )
                    }
                    disabled={pagination.page === pagination.totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
