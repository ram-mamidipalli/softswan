
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Moon, Bell, Award, View } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

type Certificate = {
    name: string;
    date: string;
};

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [notifications, setNotifications] = React.useState(true);
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);

  const fetchSettings = React.useCallback(() => {
    const storedName = localStorage.getItem('userName') || '';
    const storedBio = localStorage.getItem('userBio') || '';
    const storedNotifications = localStorage.getItem('userNotifications') !== 'false';
    const storedCerts = localStorage.getItem('earnedCertificates');
    
    setName(storedName);
    setBio(storedBio);
    setNotifications(storedNotifications);

    if (storedCerts) {
        setCertificates(JSON.parse(storedCerts));
    } else {
        setCertificates([]);
    }
  }, []);

  React.useEffect(() => {
    fetchSettings();

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'earnedCertificates' || e.key === 'userName' || e.key === 'userBio' || e.key === 'userNotifications') {
            fetchSettings();
        }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchSettings]);

  const handleSaveChanges = () => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userBio', bio);
    localStorage.setItem('userNotifications', String(notifications));
    
    toast({
      title: 'Settings Saved',
      description: 'Your changes have been successfully saved.',
    });
  };

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This information will be displayed on your public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a little about yourself"
                  className="min-h-[100px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>My Certificates</CardTitle>
              <CardDescription>
                View and download the certificates you've earned.
              </CardDescription>
            </CardHeader>
            <CardContent>
                {certificates.length > 0 ? (
                    <ul className="space-y-4">
                        {certificates.map((cert, index) => (
                            <li key={index} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">{cert.name}</p>
                                        <p className="text-sm text-muted-foreground">Awarded on {new Date(cert.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={`/dashboard/certificate?badge=${encodeURIComponent(cert.name)}&date=${cert.date}`}>
                                        <View className="mr-2 h-4 w-4" />
                                        View
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground text-sm">You haven't earned any certificates yet. Keep learning!</p>
                )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </Label>
                <Switch id="dark-mode" checked={theme === 'dark'} onCheckedChange={handleThemeChange} />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="notifications"
                  className="flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  <span>Email Notifications</span>
                </Label>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
}
