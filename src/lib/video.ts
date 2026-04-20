/**
 * Lightweight helpers for video URL handling.
 * Supports YouTube, Vimeo, and direct mp4 URLs.
 */

export type VideoSource =
  | { kind: 'youtube'; embedUrl: string; thumbnailUrl: string }
  | { kind: 'vimeo'; embedUrl: string }
  | { kind: 'mp4'; url: string }
  | { kind: 'unknown' };

/** Extract the YouTube video ID from common URL shapes. */
export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1) || null;
    }
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      const parts = u.pathname.split('/').filter(Boolean);
      // /embed/ID or /shorts/ID
      if (parts[0] === 'embed' || parts[0] === 'shorts') return parts[1] ?? null;
    }
  } catch {
    // ignore
  }
  return null;
}

export function getVimeoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('vimeo.com')) {
      const parts = u.pathname.split('/').filter(Boolean);
      const id = parts[parts.length - 1];
      if (/^\d+$/.test(id)) return id;
    }
  } catch {
    // ignore
  }
  return null;
}

export function parseVideoSource(url?: string | null): VideoSource {
  if (!url) return { kind: 'unknown' };
  const yt = getYouTubeId(url);
  if (yt) {
    return {
      kind: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1`,
      thumbnailUrl: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
    };
  }
  const vm = getVimeoId(url);
  if (vm) {
    return {
      kind: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vm}`,
    };
  }
  if (/\.mp4($|\?)/i.test(url)) {
    return { kind: 'mp4', url };
  }
  return { kind: 'unknown' };
}
