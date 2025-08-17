import { Outlet } from 'react-router-dom';

import AppSidebar from '../ui/AppSidebar';
import { SidebarProvider } from '../ui/sidebar';
import MobileSidebar from '../ui/MobileSidebar';

import { useAuth } from '@/features/auth/AuthContext';
import { AccountBox } from '../../features/auth/AccountBox';

import {
    LayoutDashboard,
    ListOrdered,
    Settings,
    ShoppingBasket,
    Users,
} from 'lucide-react';

// eslint-disable-next-line
export const navAppItems = [
    {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Product Management',
        url: '/products',
        icon: ShoppingBasket,
    },
    {
        title: 'Orders',
        url: '/orders',
        icon: ListOrdered,
    },
    {
        title: 'Customers',
        url: '/customers',
        icon: Users,
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
    },
];

export default function AppLayout() {
    const { user } = useAuth();

    return (
        <SidebarProvider>
            <div className='flex min-h-screen w-full'>
                {/* Sidebar */}
                <AppSidebar />
                <div className='flex flex-col flex-1'>
                    {/* Topbar with account box on the right */}
                    <div className='flex items-center justify-between h-14 px-4 border-b'>
                        {/* Left side */}
                        <div className='w-[40px] flex items-center justify-start'>
                            <MobileSidebar />
                        </div>
                        {/* Right side */}
                        <div className='ml-auto flex items-center gap-2'>
                            <span>{user.email}</span>
                            <AccountBox />
                        </div>
                    </div>
                    {/* Page content */}
                    <main className='flex-1 p-6'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
