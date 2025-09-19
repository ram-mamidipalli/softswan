
'use client';

import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Flame, Star, Trophy, Target, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  {
    title: 'Puzzles Solved',
    value: '12',
    icon: Target,
    change: '+2 since last week',
  },
  {
    title: 'Tutorials Completed',
    value: '5',
    icon: Trophy,
    change: '1 more to the next badge',
  },
  {
    title: 'Daily Streak',
    value: '3 Days',
    icon: Flame,
    change: 'Keep the flame alive!',
  },
  {
    title: 'Current Badge',
    value: 'Bronze Swan',
    icon: Award,
    change: '120 / 500 points',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.email?.split('@')[0] || 'Learner'}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a snapshot of your progress. Keep up the great work!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Next Badge: Silver Swan</CardTitle>
            <CardDescription>
              You are 380 points away from unlocking the Silver Swan badge.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
              <div className="text-4xl">🥉</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Bronze Swan</span>
                    <span>120 / 500 XP</span>
                </div>
                <Progress value={24} className="mt-1" />
              </div>
              <div className="text-4xl opacity-50">🥈</div>
            </div>
            <Button asChild className="ml-auto">
              <Link href="/dashboard/leaderboard">View Leaderboard</Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Start a new challenge</CardTitle>
            <CardDescription>
              Ready to test your skills? Generate a new set of puzzles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full">
              <Link href="/dashboard/problem-solving">Take a Puzzle</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
