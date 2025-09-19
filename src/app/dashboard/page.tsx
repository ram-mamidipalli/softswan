
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
import { Flame, Target, Trophy, Award, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getBadgeForPoints, type Badge, badgeLevels } from '@/lib/badges';

export default function DashboardPage() {
  const { user } = useAuth();
  const [puzzlesSolved, setPuzzlesSolved] = React.useState(0);
  const [tutorialsCompleted, setTutorialsCompleted] = React.useState(0);
  const [swanXP, setSwanXP] = React.useState(0);
  const [currentBadge, setCurrentBadge] = React.useState<Badge | null>(null);
  const [nextBadge, setNextBadge] = React.useState<Badge | null>(null);
  const [newlyAchievedBadge, setNewlyAchievedBadge] = React.useState<Badge | null>(null);
  const [displayName, setDisplayName] = React.useState('');

  React.useEffect(() => {
    const updateStats = () => {
      const prevBadgeName = localStorage.getItem('currentBadgeName');

      const solvedCount = parseInt(localStorage.getItem('puzzlesSolvedCount') || '0', 10);
      const completedTutorialsCount = JSON.parse(localStorage.getItem('completedTutorials') || '[]').length;
      const xp = parseInt(localStorage.getItem('swanXP') || '0', 10);
      const { badge, nextBadge } = getBadgeForPoints(xp);
      const storedName = localStorage.getItem('userName');
      
      setDisplayName(storedName || user?.email?.split('@')[0] || 'Learner');
      setPuzzlesSolved(solvedCount);
      setTutorialsCompleted(completedTutorialsCount);
      setSwanXP(xp);
      setCurrentBadge(badge);
      setNextBadge(nextBadge);
      

      const majorBadgeTiers = ['Silver 1', 'Gold 1', 'Platinum 1', 'Diamond 1', 'Master 1', 'Cosmic Swan'];
      if (prevBadgeName !== badge.name && majorBadgeTiers.includes(badge.name)) {
        const newlyAchieved = badgeLevels.find(b => b.name === badge.name);
        if (newlyAchieved) {
            const certificateData = {
                name: newlyAchieved.name,
                date: new Date().toISOString()
            };
            setNewlyAchievedBadge(newlyAchieved);
            sessionStorage.setItem('newlyAchievedBadge', JSON.stringify(certificateData));

            // Persist earned certificates
            const earnedCertificates = JSON.parse(localStorage.getItem('earnedCertificates') || '[]');
            const existingCert = earnedCertificates.find((c: any) => c.name === newlyAchieved.name);
            if (!existingCert) {
                earnedCertificates.push(certificateData);
                localStorage.setItem('earnedCertificates', JSON.stringify(earnedCertificates));
                window.dispatchEvent(new StorageEvent('storage', { key: 'earnedCertificates' }));
            }
        }
      }
      // Update this last
      localStorage.setItem('currentBadgeName', badge.name);
    };

    updateStats();

    const storedNewBadge = sessionStorage.getItem('newlyAchievedBadge');
    if (storedNewBadge) {
        const { name } = JSON.parse(storedNewBadge);
        const foundBadge = badgeLevels.find(b => b.name === name);
        if (foundBadge) setNewlyAchievedBadge(foundBadge);
    }

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'puzzlesSolvedCount' || e.key === 'swanXP' || e.key === 'completedTutorials' || e.key === 'userName') {
            updateStats();
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);
  
  const handleViewCertificate = () => {
    sessionStorage.removeItem('newlyAchievedBadge');
    setNewlyAchievedBadge(null);
  };

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
      emblem: currentBadge?.icon,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {displayName}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a snapshot of your progress. Keep up the great work!
        </p>
      </div>

       {newlyAchievedBadge && (
        <Card className="bg-primary/10 border-primary">
          <CardHeader className="flex-row items-center gap-4">
            <Star className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>Congratulations! You've Leveled Up!</CardTitle>
              <CardDescription>You have achieved the rank of {newlyAchievedBadge.name}.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild onClick={handleViewCertificate}>
              <Link href={`/dashboard/certificate?badge=${encodeURIComponent(newlyAchievedBadge.name)}&date=${new Date().toISOString()}`}>
                View Your Certificate
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.emblem ? (
                <span className="text-2xl">{stat.emblem}</span>
              ) : (
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
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
