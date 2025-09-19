
'use client';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import {
  Puzzle,
  Mic,
  BarChart,
  Settings,
  LogOut,
  LifeBuoy,
  BookText,
  Users,
  BookOpen,
  Newspaper,
  ClipboardList,
  Calculator,
} from 'lucide-react';
import { SwanLogo } from '../icons/swan-logo';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';


const mainNav = [
  {
    href: '/dashboard',
    label: 'My Progress',
    icon: BarChart,
  },
  {
    href: '/dashboard/problem-solving',
    label: 'Problem Solving',
    icon: Puzzle,
  },
  {
    href: '/dashboard/tutorials',
    label: 'Tutorials',
    icon: Mic,
  },
   {
    href: '/dashboard/lessons',
    label: 'Startup Lessons',
    icon: BookOpen,
  },
  {
    href: '/dashboard/articles',
    label: 'Articles',
    icon: Newspaper,
  },
  {
    href: '/dashboard/case-studies',
    label: 'Case Studies',
    icon: BookText,
  },
  {
    href: '/dashboard/investors',
    label: 'Investors',
    icon: Users,
  },
  {
    href: '/dashboard/plan-builder',
    label: 'Plan Builder',
    icon: ClipboardList,
  },
  {
    href: '/dashboard/financial-modeler',
    label: 'Financial Modeler',
    icon: Calculator,
  },
];

const secondaryNav = [
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
  {
    href: '/dashboard/support',
    label: 'Support',
    icon: LifeBuoy,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error signing out',
        description: 'There was a problem signing out. Please try again.',
      });
    }
  };

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex justify-center items-start gap-2 text-xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          <SwanLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col">
        <SidebarMenu className="gap-4">
          {mainNav.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {secondaryNav.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
