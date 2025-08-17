import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className='p-4 text-center'>Loading...</div>;
    }

    if (!user) {
        return <Navigate to='/login' replace />;
    }

    return children;
}
