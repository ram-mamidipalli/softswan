
'use client';
import { SidebarInset } from '@/components/ui/sidebar';

export function DashboardContent({ children }: { children: React.ReactNode }) {
  return <SidebarInset>{children}</SidebarInset>;
}
