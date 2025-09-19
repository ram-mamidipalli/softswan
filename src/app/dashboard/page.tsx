'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 lg:px-6">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          This is your personal space. Welcome, {user.email}!
        </p>
      </main>
      <Footer />
    </div>
  );
}
