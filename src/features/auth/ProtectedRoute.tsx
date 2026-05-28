import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className='p-4 text-center'>Loading...</div>;
    }

    if (!user) {
        return <Navigate to='/login' replace />;
    }

    return children;
}
