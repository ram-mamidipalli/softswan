
'use client';

import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, loading, router]);

  if (loading || !isAdmin) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin panel. Manage your application content here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Manage Tutorials</CardTitle>
            <CardDescription>
              Add, edit, or delete video tutorials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for future functionality */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
            <CardDescription>
              View and manage user accounts.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for future functionality */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Content</CardTitle>
            <CardDescription>
              Manage articles, puzzles, and other content.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for future functionality */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
