import type { Project } from '@/types';

/**
 * Andrew's video project portfolio.
 *
 * `videoUrl` accepts:
 *   - YouTube URLs (youtu.be/... or youtube.com/watch?v=...)
 *   - Vimeo URLs (vimeo.com/...)
 *   - Direct .mp4 URLs
 *
 * Replace placeholder `videoUrl` values with the real Plumeria / project links.
 */
export const projects: Project[] = [
  {
    id: '1',
    title: 'Plumeria: A Musical Poetry',
    category: 'short-film',
    year: '2024',
    slug: 'plumeria-a-musical-poetry',
    coverImage:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1080&q=80',
    description:
      'A short lyrical film that pairs spoken poetry with a slow, breathing edit. Built around silence, light, and the shape of a single feeling.',
    client: 'Personal Project',
    role: 'Director / Editor / Colorist',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    location: 'Metro Manila',
    featured: true,
    // Placeholder — swap with real Plumeria upload when ready
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    images: [
      {
        id: '1-1',
        src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1080&q=80',
        alt: 'Cinematic still — soft window light',
        aspectRatio: 'landscape',
      },
      {
        id: '1-2',
        src: 'https://images.unsplash.com/photo-1518930259200-3e5c9836a42b?auto=format&fit=crop&w=1080&q=80',
        alt: 'Cinematic still — silhouette and warm tones',
        aspectRatio: 'portrait',
      },
      {
        id: '1-3',
        src: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1080&q=80',
        alt: 'Cinematic still — flowers in shallow focus',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '2',
    title: 'Neon Hours',
    category: 'music-video',
    year: '2024',
    slug: 'neon-hours',
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1080&q=80',
    description:
      'A fast-paced, color-driven music video cut to the rhythm of a synth-pop track. Hard cuts, neon palettes, and a healthy dose of motion blur.',
    client: 'Indie Artist',
    role: 'Editor / Colorist',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    location: 'Metro Manila',
    featured: true,
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1080&q=80',
        alt: 'Neon-lit street scene',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '3',
    title: 'Brewline — Coffee Spot',
    category: 'commercial',
    year: '2024',
    slug: 'brewline-coffee-spot',
    coverImage:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=80',
    description:
      'A 30-second commercial spot for a local coffee brand. Warm tones, tactile sound design, and a cut that builds toward the morning ritual.',
    client: 'Brewline (Local Brand)',
    role: 'Editor',
    tools: ['Premiere Pro', 'After Effects'],
    location: 'Metro Manila',
    featured: true,
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&q=80',
        alt: 'Coffee being poured',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '4',
    title: 'Static Bloom',
    category: 'short-film',
    year: '2023',
    slug: 'static-bloom',
    coverImage:
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1080&q=80',
    description:
      'CineEscuela 2023 — 1st Runner Up. A quiet short about memory, distortion, and the noise we keep in our heads.',
    client: 'CineEscuela 2023',
    role: 'Editor',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    location: 'Metro Manila',
    featured: true,
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    images: [
      {
        id: '4-1',
        src: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1080&q=80',
        alt: 'Soft focus portrait still',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '5',
    title: 'Daily Run — YouTube Series',
    category: 'youtube',
    year: '2024',
    slug: 'daily-run-youtube',
    coverImage:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1080&q=80',
    description:
      'Long-form YouTube edits for a creator series. Tight pacing, clean B-roll layering, and retention-first structure.',
    client: 'Independent Creator',
    role: 'Editor',
    tools: ['Premiere Pro', 'CapCut'],
    location: 'Remote',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    images: [
      {
        id: '5-1',
        src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1080&q=80',
        alt: 'YouTube creator workspace',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: '6',
    title: 'Polygon Drift',
    category: 'motion-graphics',
    year: '2023',
    slug: 'polygon-drift',
    coverImage:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1080&q=80',
    description:
      'A short 3D motion piece built in Blender — abstract shapes drifting through a dim, retro-lit room. Personal exploration of mood and texture.',
    client: 'Personal Project',
    role: 'Animator / Editor',
    tools: ['Blender', 'After Effects', 'Premiere Pro'],
    location: 'Personal Studio',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    images: [
      {
        id: '6-1',
        src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1080&q=80',
        alt: '3D abstract render',
        aspectRatio: 'landscape',
      },
    ],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured).slice(0, 4);

export const getAdjacentProjects = (
  currentSlug: string
): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next:
      currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
};
