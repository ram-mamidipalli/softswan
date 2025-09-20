
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { investors } from '@/lib/investors';
import Link from 'next/link';

export default function InvestorsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Find the Right Investor
        </h1>
        <p className="text-muted-foreground">
          Browse this list of venture capital firms to find the perfect match for your startup.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {investors.map((investor) => (
          <Link
            href={`/dashboard/investors/${investor.id}`}
            key={investor.id}
            className="group"
          >
            <Card className="h-full transform-gpu transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{investor.name}</CardTitle>
                <CardDescription className="line-clamp-3">{investor.description}</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-sm font-medium text-primary">Click to see details</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
