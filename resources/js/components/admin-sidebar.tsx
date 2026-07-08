import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, Building2, LogOut } from 'lucide-react';
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
];

export function AdminSidebar() {
    const { auth } = usePage().props as any;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" className="flex items-center gap-2">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                                    <img src="/images/logo_jurijob.jpg" alt="JuriJob" className="size-8 object-cover" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">JuriJob</span>
                                    <span className="truncate text-xs text-muted-foreground">Panel Admin</span>
                                </div>
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
                            <p className="text-xs text-muted-foreground truncate">{auth?.user?.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{auth?.user?.email}</p>
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
