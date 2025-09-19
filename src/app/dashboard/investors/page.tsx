
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Link as LinkIcon } from 'lucide-react';
import { investors } from '@/lib/investors';

const ContactLink: React.FC<{ contact: string }> = ({ contact }) => {
    const isUrl = contact.startsWith('http');
    const contacts = contact.split(/, |https?:\/\//).filter(Boolean);

    return (
        <div className="flex flex-wrap gap-2">
            {contacts.map((c, index) => {
                 const isContactUrl = c.includes('.');
                 const href = isContactUrl ? `https://${c.replace(/https?:\/\//, '')}` : `tel:${c}`;
                 const Icon = isContactUrl ? LinkIcon : Phone;

                return (
                    <Button asChild key={index} variant="outline" size="sm">
                        <a href={href} target="_blank" rel="noopener noreferrer">
                            <Icon className="mr-2 h-4 w-4" />
                            {c.replace(/https?:\/\//, '')}
                        </a>
                    </Button>
                )
            })}
        </div>
    )
}

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
          <Card key={investor.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{investor.name}</CardTitle>
              <CardDescription>{investor.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">People to Know</h4>
                <div className="flex flex-wrap gap-1">
                  {investor.people.map((person) => (
                    <Badge key={person} variant="secondary">
                      {person}
                    </Badge>
                  ))}
                </div>
              </div>
               <div>
                <h4 className="text-sm font-semibold mb-2">Investment Structure</h4>
                <p className="text-sm text-muted-foreground">{investor.investmentStructure}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Industries</h4>
                 <div className="flex flex-wrap gap-1">
                    {investor.industries.map((industry) => (
                        <Badge key={industry} variant="outline" className="text-xs">
                        {industry}
                        </Badge>
                    ))}
                </div>
              </div>
               <div>
                <h4 className="text-sm font-semibold mb-2">Startups Funded</h4>
                 <p className="text-sm text-muted-foreground italic">{investor.startupsFunded.join(', ')}</p>
              </div>
            </CardContent>
             <CardFooter>
                <ContactLink contact={investor.contact} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
