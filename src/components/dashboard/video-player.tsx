
'use client';

import * as React from 'react';
import YouTube, { type YouTubeProps } from 'react-youtube';
import { useToast } from '@/hooks/use-toast';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnd: () => void;
}

function getYouTubeVideoId(url: string): string | null {
  let videoId = '';
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1];
      } else {
        videoId = urlObj.searchParams.get('v') || '';
      }
    }
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
  } catch (error) {
    console.error('Invalid video URL:', url);
    return null;
  }
  return videoId;
}

export function VideoPlayer({ videoUrl, onVideoEnd }: VideoPlayerProps) {
  const videoId = getYouTubeVideoId(videoUrl);

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  if (!videoId) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Video is unavailable.</p>
      </div>
    );
  }

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      className="w-full h-full rounded-lg overflow-hidden"
      iframeClassName="w-full h-full"
      onEnd={onVideoEnd}
    />
  );
}
