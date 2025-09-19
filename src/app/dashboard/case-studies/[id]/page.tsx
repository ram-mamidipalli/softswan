
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {study.links.map((link, index) => {
                const linkUrl = typeof link === 'string' ? link : link.url;
                const linkTitle = typeof link === 'string' ? `Read Full Case Study #${index + 1}` : link.title;
                const linkDescription = typeof link === 'string' ? '' : link.description;

                if (linkDescription) {
                    return (
                        <Card key={index} className="bg-secondary/50 flex flex-col md:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-lg">{linkTitle}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
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
                    <Button asChild key={index} variant="outline" className="justify-start text-left h-auto">
                        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3">
                            <span className="flex-grow">{linkTitle}</span>
                            <ExternalLink className="ml-auto h-4 w-4 flex-shrink-0" />
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
