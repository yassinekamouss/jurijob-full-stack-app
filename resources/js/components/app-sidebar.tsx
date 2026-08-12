import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Briefcase } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as offresIndex } from '@/routes/offres';
import type { NavItem } from '@/types';
import { useTranslation } from 'react-i18next';

const mainNavItems = (t: any): NavItem[] => [
    {
        title: t('sidebar.dashboard'),
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: t('sidebar.manage_offers'),
        href: offresIndex().url,
        icon: Briefcase,
    },
];

const footerNavItems = (t: any): NavItem[] => [
    {
        title: t('sidebar.repository'),
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: t('sidebar.documentation'),
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { t } = useTranslation();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
