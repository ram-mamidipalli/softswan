'use client';
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
import { PlaceHolderImages } from '@/lib/placeholder-images';

const leaderboardData = [
  { rank: 1, username: 'puzzle_master', points: 2540, badge: 'Golden Swan' },
  { rank: 2, username: 'riddle_fiend', points: 2310, badge: 'Golden Swan' },
  { rank: 3, username: 'logic_lord', points: 1890, badge: 'Silver Swan' },
  { rank: 4, username: 'code_ninja', points: 1550, badge: 'Silver Swan' },
  { rank: 5, username: 'learner_bee', points: 1210, badge: 'Silver Swan' },
  { rank: 6, username: 'curious_cat', points: 980, badge: 'Bronze Swan' },
  { rank: 7, username: 'you', points: 850, badge: 'Bronze Swan' },
  { rank: 8, username: 'newbie_coder', points: 720, badge: 'Bronze Swan' },
  { rank: 9, username: 'thinker_bell', points: 610, badge: 'Bronze Swan' },
  { rank: 10, username: 'smart_swan', points: 500, badge: 'Bronze Swan' },
];

const badgeColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline'} = {
  'Golden Swan': 'default',
  'Silver Swan': 'secondary',
  'Bronze Swan': 'outline',
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const avatar1 = PlaceHolderImages.find((img) => img.id === 'avatar1');

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
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((player) => (
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
                         {avatar1 && player.username === 'you' && (
                            <AvatarImage
                                src={avatar1.imageUrl}
                                alt={avatar1.description}
                                data-ai-hint={avatar1.imageHint}
                            />
                            )}
                        <AvatarFallback>
                          {player.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{player.username}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={badgeColors[player.badge] || 'outline'}>
                      {player.badge}
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
