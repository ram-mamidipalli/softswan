

'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardContent } from './content';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (pathname === '/dashboard/certificate') {
    return <>{children}</>;
  }


  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
        <DashboardSidebar />
      </Sidebar>
      <DashboardContent>
        <DashboardHeader />
        <main className={pathname === '/dashboard/financial-modeler' ? "" : "p-4 sm:p-6 lg:p-8"}>
          {children}
        </main>
      </DashboardContent>
    </SidebarProvider>
  );
}
