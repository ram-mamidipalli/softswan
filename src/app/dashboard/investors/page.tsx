
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
import { ArrowRight } from 'lucide-react';

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
            <Card className="h-full flex flex-col border border-border transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-primary">
              <CardHeader>
                <CardTitle>{investor.name}</CardTitle>
                <CardDescription className="line-clamp-3 pt-1">{investor.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                 <p className="text-sm font-semibold text-primary flex items-center gap-2">
                  View Details <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
