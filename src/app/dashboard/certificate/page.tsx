
'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SwanLogo } from '@/components/icons/swan-logo';
import { useAuth } from '@/hooks/use-auth';
import { ArrowLeft, Download } from 'lucide-react';
import { badgeLevels, type Badge } from '@/lib/badges';
import { toPng } from 'html-to-image';

export default function CertificatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const certificateRef = React.useRef<HTMLDivElement>(null);

  const badgeName = searchParams.get('badge');
  const date = searchParams.get('date');

  const badge: Badge | undefined = badgeLevels.find(b => b.name === badgeName);

  React.useEffect(() => {
    if (!badgeName || !date) {
      router.push('/dashboard');
    }
  }, [badgeName, date, router]);

  if (!badgeName || !date || !badge) {
    return null;
  }
  
  const handleDownload = React.useCallback(() => {
    if (certificateRef.current === null) {
      return;
    }

    toPng(certificateRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `softswan-certificate-${badge.name.toLowerCase().replace(/ /g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [badge.name]);

  return (
    <div className="bg-background text-foreground min-h-screen">
       <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-background/80 backdrop-blur-sm z-10">
         <Button variant="ghost" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
        </Button>
        <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
        </Button>
      </div>

      <div className="max-w-4xl mx-auto p-8 pt-24">
        <div ref={certificateRef} className="border-[10px] border-primary p-8 rounded-lg shadow-2xl bg-white text-foreground relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent rounded-full blur-2xl"></div>
            
            <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center text-5xl font-bold text-foreground mb-4">
                    <SwanLogo />
                </div>
                <h1 className="text-4xl font-bold text-primary tracking-wider">
                    Certificate of Achievement
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">This certificate is proudly presented to</p>
            </div>

            <div className="text-center my-12 relative z-10">
                <h2 className="text-5xl font-headline font-extrabold text-foreground">
                    {user?.email?.split('@')[0] || 'A Valued Learner'}
                </h2>
                <div className="w-1/2 mx-auto h-0.5 bg-primary/50 mt-4"></div>
            </div>

            <div className="text-center relative z-10">
                <p className="text-muted-foreground text-lg">For successfully achieving the rank of</p>
                <div className="flex items-center justify-center gap-4 mt-4">
                    <span className="text-6xl">{badge.icon}</span>
                    <h3 className="text-4xl font-bold text-primary">{badge.name}</h3>
                </div>
            </div>

            <div className="mt-16 flex justify-between items-center text-sm text-muted-foreground relative z-10">
                <div>
                    <p className="font-semibold border-t border-muted-foreground pt-2">Date Awarded</p>
                    <p>{new Date(date).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="font-semibold border-t border-muted-foreground pt-2">SoftSwan Academy</p>
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
