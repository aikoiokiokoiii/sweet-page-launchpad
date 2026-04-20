import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

const CATEGORY_LABELS: Record<Project['category'], string> = {
  'music-video': 'MUSIC VIDEO',
  commercial: 'COMMERCIAL',
  'short-film': 'SHORT FILM',
  youtube: 'YOUTUBE',
  social: 'SOCIAL',
  'motion-graphics': 'MOTION / 3D',
};

/**
 * Project card — cinematic still + retro chip + hover zoom & glitch.
 * Used on Home (featured) and Portfolio grid.
 */
export function ProjectCard({
  project,
  aspectRatio,
  showCategory = true,
  index = 0,
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ratio = aspectRatio || 'landscape';

  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]',
    square: 'aspect-square',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm hover-glitch"
      >
        <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
          {!isLoaded && <div className="absolute inset-0 bg-muted" />}

          <motion.img
            src={project.coverImage}
            alt={project.title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              isLoaded ? 'opacity-100' : 'opacity-0',
              'group-hover:scale-105'
            )}
            loading={index < 4 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
          />

          {/* Category chip — always visible, top-left */}
          {showCategory && (
            <div className="absolute top-3 left-3 z-10">
              <span className="retro-chip text-retro-cream bg-background/60 backdrop-blur-sm">
                {CATEGORY_LABELS[project.category]}
              </span>
            </div>
          )}

          {/* Year — top-right */}
          <div className="absolute top-3 right-3 z-10 font-mono text-xs tracking-widest text-retro-cream/80 bg-background/40 backdrop-blur-sm px-2 py-1">
            {project.year}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center size-8 rounded-full bg-retro-orange text-primary-foreground transition-transform group-hover:scale-110">
                  <Play className="size-4 fill-current" />
                </span>
                <h3 className="headline text-xl md:text-2xl text-retro-cream">
                  {project.title}
                </h3>
              </div>
              {project.role && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-retro-cyan">
                  {project.role}
                </p>
              )}
            </div>
          </div>

          {/* Subtle border accent on hover */}
          <div className="absolute inset-0 border border-retro-orange/0 group-hover:border-retro-orange/40 transition-colors duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
