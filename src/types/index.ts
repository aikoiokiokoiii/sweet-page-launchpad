/**
 * Core TypeScript interfaces for Andrew Sañosa — Video Editor / Filmmaker portfolio
 */

export type ProjectCategory =
  | 'music-video'
  | 'commercial'
  | 'short-film'
  | 'youtube'
  | 'social'
  | 'motion-graphics';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

/**
 * A video project. `videoUrl` may be:
 *  - a YouTube URL (https://youtu.be/... or https://www.youtube.com/watch?v=...)
 *  - a Vimeo URL
 *  - a direct .mp4 URL
 */
export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  /** Optional gallery of stills */
  images: ProjectImage[];
  description: string;
  client?: string;
  /** Andrew's role on this project (e.g. "Editor", "Director / Editor") */
  role?: string;
  /** Tools / software used on the project */
  tools?: string[];
  /** Camera or production gear, when relevant */
  camera?: string;
  location?: string;
  slug: string;
  /** Embed/source URL for the project video */
  videoUrl?: string;
  /** Featured on home page */
  featured?: boolean;
}

export interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  turnaround: string;
  revisions: string;
  deliverables: string[];
  highlight?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
}

/**
 * Renamed semantically to "creator" but kept type name for backwards compat
 * with existing imports across the codebase.
 */
export interface PhotographerInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  biography: string;
  approach: string;
  /** Years of professional experience */
  yearsExperience: number;
  awards: string[];
  clients: string[];
  skills: string[];
  tools: string[];
  services: ServiceItem[];
  pricing: PricingTier[];
  education: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    behance?: string;
    youtube?: string;
  };
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'music-video' | 'commercial' | 'short-film' | 'youtube' | 'other';
  message: string;
  timestamp: Date;
}
