import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, Building2, Briefcase, LogOut } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { NavMain } from '@/components/nav-main';
import type { NavItem } from '@/types';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Candidats',
        href: '/admin/candidats',
        icon: Users,
    },
    {
        title: 'Recruteurs',
        href: '/admin/recruteurs',
        icon: Building2,
    },
    {
        title: 'Offres',
        href: '/admin/offres',
        icon: Briefcase,
    },
];

export function AdminSidebar() {
    const { auth } = usePage().props as any;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" className="flex items-center justify-center py-8 group-data-[collapsible=icon]:hidden">
                                <img src="/images/logo_jurijob.png"
                                    alt="JuriJob - Logo"
                                    width={100}
                                    height={100}
                                    className="w-auto h-32" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={adminNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarSeparator />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="px-2 py-1.5">
                            <p className="text-xs text-sidebar-foreground/70 truncate">{auth?.user?.name}</p>
                            <p className="text-xs text-sidebar-foreground/70 truncate">{auth?.user?.email}</p>
                        </div>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                            <Link href="/admin/logout" method="post" as="button" className="w-full">
                                <LogOut className="size-4" />
                                <span>Déconnexion</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
