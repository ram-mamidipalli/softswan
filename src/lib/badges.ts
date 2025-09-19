
export type Badge = {
  name: string;
  xpRequired: number;
  icon: string;
};

export const badgeLevels: Badge[] = [
  { name: 'Bronze Swan', xpRequired: 0, icon: '🥉' },
  { name: 'Silver 1', xpRequired: 100, icon: '🥈' },
  { name: 'Silver 2', xpRequired: 200, icon: '🥈' },
  { name: 'Silver 3', xpRequired: 300, icon: '🥈' },
  { name: 'Gold 1', xpRequired: 400, icon: '🥇' },
  { name: 'Gold 2', xpRequired: 500, icon: '🥇' },
  { name: 'Gold 3', xpRequired: 600, icon: '🥇' },
  { name: 'Platinum 1', xpRequired: 700, icon: '💎' },
  { name: 'Platinum 2', xpRequired: 800, icon: '💎' },
  { name: 'Platinum 3', xpRequired: 900, icon: '💎' },
  { name: 'Diamond 1', xpRequired: 1000, icon: '💠' },
  { name: 'Diamond 2', xpRequired: 1100, icon: '💠' },
  { name: 'Diamond 3', xpRequired: 1200, icon: '💠' },
  { name: 'Master 1', xpRequired: 1300, icon: '⭐' },
  { name: 'Master 2', xpRequired: 1400, icon: '⭐' },
  { name: 'Master 3', xpRequired: 1500, icon: '⭐' },
  { name: 'Master 4', xpRequired: 1600, icon: '⭐' },
  { name: 'Master 5', xpRequired: 1700, icon: '⭐' },
  { name: 'Cosmic Swan', xpRequired: 1800, icon: '🌌' },
];

export function getBadgeForPoints(points: number): { badge: Badge, nextBadge: Badge | null } {
  let currentBadge: Badge = badgeLevels[0];
  let nextBadge: Badge | null = null;

  for (let i = 0; i < badgeLevels.length; i++) {
    if (points >= badgeLevels[i].xpRequired) {
      currentBadge = badgeLevels[i];
    } else {
      nextBadge = badgeLevels[i];
      break;
    }
  }

  // If the user has more points than the last badge, they are at the max level
  if (points >= badgeLevels[badgeLevels.length - 1].xpRequired) {
    currentBadge = badgeLevels[badgeLevels.length - 1];
    nextBadge = null;
  }
  
  return { badge: currentBadge, nextBadge };
}
