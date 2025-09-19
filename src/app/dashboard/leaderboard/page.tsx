
'use client';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { User, Trophy } from 'lucide-react';
import { getBadgeForPoints, type Badge as BadgeType } from '@/lib/badges';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [userPoints, setUserPoints] = React.useState(0);
  const [userBadge, setUserBadge] = React.useState<BadgeType | null>(null);

  React.useEffect(() => {
    const xp = parseInt(localStorage.getItem('swanXP') || '0', 10);
    const { badge } = getBadgeForPoints(xp);
    setUserPoints(xp);
    setUserBadge(badge);

     const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'swanXP') {
            const newXp = parseInt(e.newValue || '0', 10);
            const { badge: newBadge } = getBadgeForPoints(newXp);
            setUserPoints(newXp);
            setUserBadge(newBadge);
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const currentUserData = {
    rank: 1,
    username: user?.email?.split('@')[0] || 'you',
    points: userPoints,
    badgeName: userBadge?.name || 'Bronze Swan',
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          See where you stand. Keep earning XP to climb the ranks!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Ranking</CardTitle>
          <CardDescription>
            This is your current position based on your XP.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-accent">
                  <TableCell className="font-medium">{currentUserData.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{currentUserData.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant='default'>
                      {currentUserData.badgeName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {currentUserData.points}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
             <div className="flex flex-col items-center justify-center py-12 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No data available</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Please log in to see your ranking.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
