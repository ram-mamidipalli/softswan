
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { Phone, Link as LinkIcon, ArrowLeft, Loader2 } from 'lucide-react';
import { investors, type Investor } from '@/lib/investors';

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

export default function InvestorDetailPage() {
    const [investor, setInvestor] = React.useState<Investor | null>(null);
    const params = useParams();
    const router = useRouter();
    const investorId = parseInt(params.id as string, 10);

    React.useEffect(() => {
        if (isNaN(investorId)) {
            router.push('/dashboard/investors');
            return;
        }
        const currentInvestor = investors.find((i) => i.id === investorId);
        if (currentInvestor) {
            setInvestor(currentInvestor);
        } else {
            router.push('/dashboard/investors');
        }
    }, [investorId, router]);

    if (!investor) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

  return (
    <div className="max-w-4xl mx-auto">
        <Button
            variant="ghost"
            onClick={() => router.push('/dashboard/investors')}
            className="mb-4"
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Investors
        </Button>
      <Card key={investor.id} className="flex flex-col">
        <CardHeader>
            <CardTitle className="text-2xl">{investor.name}</CardTitle>
            <CardDescription>{investor.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-6">
            <div>
            <h4 className="text-sm font-semibold mb-2">People to Know</h4>
            <div className="flex flex-wrap gap-2">
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
                <div className="flex flex-wrap gap-2">
                {investor.industries.map((industry) => (
                    <Badge key={industry} variant="outline" className="font-normal">
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
    </div>
  );
}
