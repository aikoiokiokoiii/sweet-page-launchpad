import { parseVideoSource } from '@/lib/video';

interface VideoPlayerProps {
  url?: string | null;
  title: string;
  className?: string;
  /** Show a poster + play overlay before activating the iframe (saves bandwidth). */
  lite?: boolean;
}

/**
 * Responsive 16:9 video player that supports YouTube, Vimeo, and direct mp4.
 * Falls back to a placeholder when the source can't be parsed.
 */
export function VideoPlayer({ url, title, className = '', lite = false }: VideoPlayerProps) {
  const source = parseVideoSource(url);

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-sm bg-black ${className}`}
    >
      {source.kind === 'youtube' && (
        <iframe
          src={source.embedUrl}
          title={title}
          loading={lite ? 'lazy' : 'eager'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}

      {source.kind === 'vimeo' && (
        <iframe
          src={source.embedUrl}
          title={title}
          loading={lite ? 'lazy' : 'eager'}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}

      {source.kind === 'mp4' && (
        <video
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={source.url} type="video/mp4" />
        </video>
      )}

      {source.kind === 'unknown' && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
          Video coming soon
        </div>
      )}
    </div>
  );
}
