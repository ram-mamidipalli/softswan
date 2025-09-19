
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { caseStudies, type CaseStudy, type CaseStudyLink } from '@/lib/case-studies';
import { Loader2, ArrowLeft, ExternalLink, Globe } from 'lucide-react';
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

function isCaseStudyLink(link: string | CaseStudyLink): link is CaseStudyLink {
    return typeof link === 'object' && link !== null && 'url' in link;
}


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
          <div className="flex justify-between items-start">
            <Badge variant="secondary" className="w-fit mb-2">{study.companyName}</Badge>
            {study.websiteUrl && (
                <Button variant="outline" size="sm" asChild>
                    <a href={study.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Company
                    </a>
                </Button>
            )}
          </div>
          <CardTitle className="text-2xl">{study.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{study.description}</p>
          <div className="flex flex-col gap-4">
             {study.links.map((link, index) => {
                const linkUrl = typeof link === 'string' ? link : link.url;
                const linkTitle = typeof link === 'string' ? `Read Full Case Study #${index + 1}` : link.title;
                const linkDescription = typeof link === 'string' ? '' : link.description;

                if (linkDescription) {
                    return (
                        <Card key={index} className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className="text-lg">{linkTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{linkDescription}</p>
                                <Button asChild variant="outline">
                                    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                                        Read More
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    )
                }
                return (
                    <Button asChild key={index} variant="outline" className="justify-between">
                        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                        {linkTitle}
                        <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                )
             })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
