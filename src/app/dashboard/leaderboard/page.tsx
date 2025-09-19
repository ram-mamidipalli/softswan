
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

const dummyUsers = [
    { username: 'alex', points: 1550 },
    { username: 'brian', points: 1400 },
    { username: 'casey', points: 1250 },
    { username: 'dylan', points: 1100 },
    { username: 'elliot', points: 950 },
    { username: 'fiona', points: 800 },
    { username: 'george', points: 650 },
    { username: 'hannah', points: 500 },
    { username: 'ian', points: 350 },
    { username: 'jenna', points: 200 },
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = React.useState<any[]>([]);

   React.useEffect(() => {
    const updateLeaderboard = () => {
        if (!user) return;
        
        const xp = parseInt(localStorage.getItem('swanXP') || '0', 10);
        
        const currentUser = {
            username: user.email?.split('@')[0] || 'you',
            points: xp,
            isCurrentUser: true,
        };

        const combinedUsers = [...dummyUsers, currentUser];
        
        const sortedUsers = combinedUsers.sort((a, b) => b.points - a.points);
        
        const rankedUsers = sortedUsers.map((u, index) => {
            const { badge } = getBadgeForPoints(u.points);
            return {
                ...u,
                rank: index + 1,
                badgeName: badge.name,
            };
        });

        setLeaderboardData(rankedUsers);
    };

    updateLeaderboard();

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'swanXP') {
            updateLeaderboard();
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

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
          <CardTitle>Global Rankings</CardTitle>
          <CardDescription>
            This is your current position based on your XP compared to other learners.
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
                {leaderboardData.map((player) => (
                    <TableRow key={player.username} className={cn({'bg-accent': player.isCurrentUser})}>
                        <TableCell className="font-medium">{player.rank}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                <User className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{player.username}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant='secondary'>
                            {player.badgeName}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                            {player.points}
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="flex flex-col items-center justify-center py-12 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No data available</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Please log in to see the leaderboard.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
