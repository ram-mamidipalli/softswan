
'use client';

import { Suspense, useEffect, useState } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Loader2 } from 'lucide-react';

function AuthContent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
          {isClient ? <AuthForm /> : <Loader2 className="h-8 w-8 animate-spin" />}
      </main>
      <Footer />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <AuthContent />
    </Suspense>
  );
}
