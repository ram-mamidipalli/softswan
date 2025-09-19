
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground">
          Have a question or need help? Here's how you can reach us.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            We're available to assist you. Please feel free to get in touch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
            <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground text-sm mb-1">For any support queries, please email us.</p>
                    <a href="mailto:ramasubbarao1125@gmail.com" className="text-primary hover:underline">
                        ramasubbarao1125@gmail.com
                    </a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                    <h3 className="font-semibold">Phone</h3>
                     <p className="text-muted-foreground text-sm mb-1">You can also reach us by phone during business hours.</p>
                    <a href="tel:+1234567890" className="text-primary hover:underline">
                        +1 (234) 567-890
                    </a>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
