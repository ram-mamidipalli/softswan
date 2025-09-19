
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { caseStudies, type CaseStudy } from '@/lib/case-studies';
import { Loader2, ArrowLeft, ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function CaseStudyPage() {
  const [study, setStudy] = React.useState<CaseStudy | null>(null);
  const params = useParams();
  const router = useRouter();
  const studyId = parseInt(params.id as string, 10);

  React.useEffect(() => {
    if (isNaN(studyId)) {
      router.push('/dashboard/case-studies');
      return;
    }
    const currentStudy = caseStudies.find((s) => s.id === studyId);
    if (currentStudy) {
      setStudy(currentStudy);
    } else {
      router.push('/dashboard/case-studies');
    }
  }, [studyId, router]);

  if (!study) {
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
        onClick={() => router.push('/dashboard/case-studies')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Case Studies
      </Button>
      <Card>
         <CardHeader>
          <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
             <Image
                src={study.imageUrl}
                alt={study.title}
                fill
                className={'object-cover'}
                data-ai-hint={study.imageHint}
              />
          </div>
          <Badge variant="secondary" className="w-fit mb-2">{study.companyName}</Badge>
          <CardTitle className="text-2xl">{study.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{study.description}</p>
          <Button asChild>
            <a href={study.link} target="_blank" rel="noopener noreferrer">
              Read Full Case Study
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
