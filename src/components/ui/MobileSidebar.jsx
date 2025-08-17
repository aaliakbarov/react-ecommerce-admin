import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { navAppItems } from '../layout/AppLayout';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { Menu } from 'lucide-react';

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='md:hidden'>
                    <Menu className='h-5 w-5' />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <SheetHeader>
                    <SheetTitle className='text-center text-3xl font-light mt-2'>
                        Admin Panel
                    </SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col gap-1 px-4 py-2 '>
                    {/* eslint-disable-next-line */}
                    {navAppItems.map(({ url, title, icon: Icon }) => (
                        <NavLink
                            key={url}
                            to={url}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition ${
                                    isActive ? 'bg-gray-200 font-semibold' : ''
                                }`
                            }
                        >
                            <Icon className='w-5 h-5' />
                            <span className='text-xl font-light'>{title}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className='border-t text-muted-foreground text-center p-4'>
                    <span>
                        Made by{' '}
                        <a
                            href='https://aaliakbarov.github.io/'
                            target='blank'
                            className='text-blue-500 hover:text-blue-600'
                        >
                            @aaliakbarov
                        </a>
                    </span>
                </div>
            </SheetContent>
        </Sheet>
    );
}
