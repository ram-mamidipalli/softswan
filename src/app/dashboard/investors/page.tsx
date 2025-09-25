
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
import { ArrowRight, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from 'next/navigation';
import { globalInvestors } from '@/lib/global-investors';

function InvestorCard({ investor }: { investor: (typeof investors)[0] | (typeof globalInvestors)[0] }) {
  const isGlobal = 'website' in investor;
  const link = isGlobal ? investor.website : `/dashboard/investors/${investor.id}`;
  
  // For global investors with no specific detail page, link directly to their website if available.
  if (isGlobal) {
    return (
       <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group h-full"
      >
        <Card className="h-full flex flex-col border-2 border-primary/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-primary">
          <CardHeader>
            <CardTitle>{investor.name}</CardTitle>
            <CardDescription className="line-clamp-3 pt-1">{investor.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
              <p className="text-sm font-semibold text-primary flex items-center gap-2">
              Visit Website <Globe className="h-4 w-4" />
            </p>
          </CardContent>
        </Card>
      </a>
    )
  }

  return (
    <Link
      href={`/dashboard/investors/${investor.id}`}
      key={investor.id}
      className="group"
    >
      <Card className="h-full flex flex-col border-2 border-primary/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-primary">
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
  )
}


export default function InvestorsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Find the Right Investor
        </h1>
        <p className="text-muted-foreground">
          Browse this curated list of venture capital firms to find the perfect match for your startup.
        </p>
      </div>
      
      <Tabs defaultValue="indian" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="indian">Indian Investors</TabsTrigger>
          <TabsTrigger value="global">Global Investors</TabsTrigger>
        </TabsList>
        <TabsContent value="indian" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {investors.map((investor) => (
              <InvestorCard key={investor.id} investor={investor} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="global" className="mt-6">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {globalInvestors.map((investor) => (
              <InvestorCard key={investor.name} investor={investor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
