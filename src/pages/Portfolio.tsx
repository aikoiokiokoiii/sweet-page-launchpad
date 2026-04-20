import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, getProjectsByCategory } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { cn } from '@/lib/utils';

const FILTERS: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'short-film', label: 'Short Film' },
  { value: 'music-video', label: 'Music Video' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'motion-graphics', label: 'Motion / 3D' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<string>('all');
  const filtered = getProjectsByCategory(filter);

  return (
    <>
      <SEOHead
        title="Portfolio"
        description="Browse Andrew Sañosa's complete video portfolio — short films, music videos, commercial spots, YouTube edits, and motion graphics."
      />

      <div className="min-h-screen">
        <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border grain-overlay">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-xs tracking-[0.4em] text-retro-orange uppercase mb-4">
                ⏵ Reel
              </p>
              <h1 className="headline text-5xl md:text-6xl lg:text-7xl mb-4">Portfolio</h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                A curated selection of edits, films, and motion work.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 md:px-8 pt-10">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] border transition-colors',
                  filter === f.value
                    ? 'border-retro-orange text-retro-orange bg-retro-orange/10'
                    : 'border-border text-muted-foreground hover:border-retro-orange/60 hover:text-foreground'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="max-w-7xl mx-auto mt-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </div>
        </section>

        <section className="py-10 md:py-12 px-2 md:px-4">
          <PortfolioGrid projects={filtered} />
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}
