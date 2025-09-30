
'use client';

import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Newspaper, Users, Puzzle } from 'lucide-react';
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
        <Link href="/dashboard/admin/content" className="group">
          <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
            <CardHeader>
               <div className="flex items-center gap-4">
                <Newspaper className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Manage Content</CardTitle>
                  <CardDescription>
                    Tutorials, lessons, and articles.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Placeholder for future functionality */}
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/admin/puzzles" className="group">
          <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
            <CardHeader>
               <div className="flex items-center gap-4">
                <Puzzle className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Manage Puzzles</CardTitle>
                  <CardDescription>
                    Problem-solving challenges.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Placeholder for future functionality */}
            </CardContent>
          </Card>
        </Link>
         <Link href="/dashboard/admin/users" className="group">
            <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader>
                <div className="flex items-center gap-4">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                    <CardTitle>Manage Users</CardTitle>
                    <CardDescription>
                        View and manage user accounts.
                    </CardDescription>
                    </div>
                </div>
                </CardHeader>
                <CardContent>
                {/* Placeholder for future functionality */}
                </CardContent>
            </Card>
        </Link>
      </div>
    </div>
  );
}
