
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
import { Link as LinkIcon, ArrowLeft, Loader2, Globe } from 'lucide-react';
import { globalInvestors, type GlobalInvestor } from '@/lib/global-investors';

const ContactLink: React.FC<{ contact: string }> = ({ contact }) => {
    const isUrl = contact.startsWith('http');
    const isNA = contact === 'N/A';
    const isNetwork = !isUrl && !isNA;

    if (isNA) {
        return <p className="text-sm text-muted-foreground italic">Contact information not publicly available.</p>
    }

    if (isNetwork) {
        return <p className="text-sm text-muted-foreground italic">{contact}</p>
    }

    return (
        <Button asChild variant="outline" size="sm">
            <a href={contact} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
            </a>
        </Button>
    )
}

export default function GlobalInvestorDetailPage() {
    const [investor, setInvestor] = React.useState<GlobalInvestor | null>(null);
    const params = useParams();
    const router = useRouter();
    const investorId = parseInt(params.id as string, 10);

    React.useEffect(() => {
        if (isNaN(investorId)) {
            router.push('/dashboard/investors');
            return;
        }
        const currentInvestor = globalInvestors.find((i) => i.id === investorId);
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
            {investor.notableInvestments.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold mb-2">Notable Investments</h4>
                    <p className="text-sm text-muted-foreground italic">{investor.notableInvestments.join(', ')}</p>
                </div>
            )}
        </CardContent>
            <CardFooter className="flex-col items-start gap-2">
                <h4 className="text-sm font-semibold">Contact</h4>
                <ContactLink contact={investor.website} />
        </CardFooter>
      </Card>
    </div>
  );
}
