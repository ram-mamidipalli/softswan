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
import { User } from 'lucide-react';
import { getBadgeForPoints, type Badge as BadgeType } from '@/lib/badges';

const leaderboardData = [
  { rank: 1, username: 'puzzle_master', points: 2540, badgeName: 'Master 5' },
  { rank: 2, username: 'riddle_fiend', points: 2310, badgeName: 'Master 3' },
  { rank: 3, username: 'logic_lord', points: 1890, badgeName: 'Diamond 2' },
  { rank: 4, username: 'code_ninja', points: 1550, badgeName: 'Platinum 1' },
  { rank: 5, username: 'learner_bee', points: 1210, badgeName: 'Gold 3' },
  { rank: 6, username: 'curious_cat', points: 980, badgeName: 'Silver 2' },
  { rank: 7, username: 'you', points: 850, badgeName: 'Silver 1' },
  { rank: 8, username: 'newbie_coder', points: 720, badgeName: 'Bronze Swan' },
  { rank: 9, username: 'thinker_bell', points: 610, badgeName: 'Bronze Swan' },
  { rank: 10, username: 'smart_swan', points: 500, badgeName: 'Bronze Swan' },
];


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

  const updatedLeaderboard = leaderboardData.map(player => 
    player.username === 'you' ? { ...player, points: userPoints, badgeName: userBadge?.name || 'Bronze Swan' } : player
  ).sort((a, b) => b.points - a.points).map((p, i) => ({ ...p, rank: i + 1 }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          See where you stand among the top learners.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
          <CardDescription>
            Top 10 users based on points earned.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {updatedLeaderboard.map((player) => (
                <TableRow
                  key={player.rank}
                  className={cn({
                    'bg-accent': player.username === 'you',
                  })}
                >
                  <TableCell className="font-medium">{player.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {player.username === 'you' ? (
                            <User className="h-5 w-5" />
                          ) : (
                            player.username.charAt(0).toUpperCase()
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{player.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={player.username === 'you' ? 'default' : 'secondary'}>
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
        </CardContent>
      </Card>
    </div>
  );
}
