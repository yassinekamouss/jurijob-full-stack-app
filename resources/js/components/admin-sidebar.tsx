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
import { useTranslation } from 'react-i18next';

const adminNavItems = (t: any): NavItem[] => [
    {
        title: t('sidebar.dashboard'),
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: t('sidebar.candidates'),
        href: '/admin/candidats',
        icon: Users,
    },
    {
        title: t('sidebar.recruiters'),
        href: '/admin/recruteurs',
        icon: Building2,
    },
    {
        title: t('sidebar.offers'),
        href: '/admin/offres',
        icon: Briefcase,
    },
];

export function AdminSidebar() {
    const { auth } = usePage().props as any;
    const { t } = useTranslation();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b border-sidebar-border/40 px-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link
                            href="/admin/dashboard"
                            className="
                                flex h-[120px] w-full items-center justify-center
                                px-6
                                transition-opacity duration-200
                                hover:opacity-90
                                group-data-[collapsible=icon]:hidden
                            "
                        >
                            <img
                                src="/images/logo_jurijob.webp"
                                alt="JuriJob"
                                className="
                                    block
                                    h-auto
                                    w-full
                                    max-w-[215px]
                                    object-contain
                                "
                            />
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={adminNavItems(t)} />
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
                                <span>{t('sidebar.logout')}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
