import { NavLink } from 'react-router-dom';

import { navAppItems } from '../layout/AppLayout';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from './sidebar';

export default function AppSidebar() {
    return (
        <div>
            <Sidebar>
                <SidebarHeader className='text-center text-3xl font-light mt-2'>
                    Admin Panel
                </SidebarHeader>
                <SidebarContent className='flex justify-center'>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navAppItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition ${
                                                    isActive
                                                        ? 'bg-gray-200 font-semibold'
                                                        : ''
                                                }`
                                            }
                                        >
                                            <item.icon />
                                            <span className='text-xl font-light'>
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className='text-center'>
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
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}
