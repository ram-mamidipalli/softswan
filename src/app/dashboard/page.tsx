
'use client';

import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Flame, Target, Trophy, Award, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getBadgeForPoints, type Badge } from '@/lib/badges';

export default function DashboardPage() {
  const { user } = useAuth();
  const [puzzlesSolved, setPuzzlesSolved] = React.useState(0);
  const [tutorialsCompleted, setTutorialsCompleted] = React.useState(0);
  const [swanXP, setSwanXP] = React.useState(0);
  const [currentBadge, setCurrentBadge] = React.useState<Badge | null>(null);
  const [nextBadge, setNextBadge] = React.useState<Badge | null>(null);

  React.useEffect(() => {
    const updateStats = () => {
      const solvedCount = parseInt(localStorage.getItem('puzzlesSolvedCount') || '0', 10);
      const completedTutorialsCount = JSON.parse(localStorage.getItem('completedTutorials') || '[]').length;
      const xp = parseInt(localStorage.getItem('swanXP') || '0', 10);
      const { badge, nextBadge } = getBadgeForPoints(xp);
      
      setPuzzlesSolved(solvedCount);
      setTutorialsCompleted(completedTutorialsCount);
      setSwanXP(xp);
      setCurrentBadge(badge);
      setNextBadge(nextBadge);
    };

    updateStats();

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'puzzlesSolvedCount' || e.key === 'swanXP' || e.key === 'completedTutorials') {
            updateStats();
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const progressPercentage = currentBadge && nextBadge 
    ? ((swanXP - currentBadge.xpRequired) / (nextBadge.xpRequired - currentBadge.xpRequired)) * 100
    : swanXP > 0 ? 100 : 0;

  const stats = [
    {
      title: 'Puzzles Solved',
      value: puzzlesSolved.toString(),
      icon: Target,
      change: `+${puzzlesSolved * 10} XP earned`,
    },
    {
      title: 'Total Swan XP',
      value: swanXP.toString(),
      icon: Flame,
      change: 'Keep the flame alive!',
    },
    {
      title: 'Tutorials Completed',
      value: tutorialsCompleted.toString(),
      icon: CheckCircle,
      change: `+${tutorialsCompleted * 30} XP earned`,
    },
    {
      title: 'Current Badge',
      value: currentBadge?.name || 'Bronze Swan',
      icon: Award,
      change: nextBadge ? `${nextBadge.xpRequired - swanXP} XP to next` : 'Max level reached!',
    },
  ];

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
            <CardTitle>Next Badge: {nextBadge?.name || 'Cosmic Swan'}</CardTitle>
            <CardDescription>
              {nextBadge 
                ? `You are ${nextBadge.xpRequired - swanXP} points away from unlocking the ${nextBadge.name} badge.`
                : 'You have achieved the highest rank!'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <div className="flex items-center gap-4">
              <div className="text-4xl">{currentBadge?.icon || '🥉'}</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentBadge?.name || 'Bronze Swan'}</span>
                    {nextBadge && <span>{swanXP} / {nextBadge.xpRequired} XP</span>}
                </div>
                <Progress value={progressPercentage} className="mt-1" />
              </div>
              <div className="text-4xl opacity-50">{nextBadge?.icon || '🌌'}</div>
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
              Ready to test your skills? Jump into the next puzzle.
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
