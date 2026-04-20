import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Wrench, Film, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { VideoPlayer } from '@/components/portfolio/VideoPlayer';

const CATEGORY_LABELS: Record<string, string> = {
  'music-video': 'MUSIC VIDEO',
  commercial: 'COMMERCIAL',
  'short-film': 'SHORT FILM',
  youtube: 'YOUTUBE',
  social: 'SOCIAL',
  'motion-graphics': 'MOTION / 3D',
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentProjects(slug) : { prev: null, next: null };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return <Navigate to="/404" replace />;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
      />

      <div className="min-h-screen">
        {/* Hero video / cover */}
        <section className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="retro-chip text-retro-orange">
                  {CATEGORY_LABELS[project.category] ?? project.category.toUpperCase()}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <h1 className="headline text-4xl md:text-6xl lg:text-7xl">{project.title}</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grain-overlay"
            >
              {project.videoUrl ? (
                <VideoPlayer url={project.videoUrl} title={project.title} />
              ) : (
                <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-muted">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Project info */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground font-mono uppercase tracking-[0.15em]">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <span>{project.year}</span>
              </div>
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.role && (
                <div className="flex items-center gap-2">
                  <User className="size-4" />
                  <span>{project.role}</span>
                </div>
              )}
            </div>

            <Separator />

            <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
              {project.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              {project.client && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Film className="size-4" />
                    <span>Client</span>
                  </div>
                  <p className="font-light text-foreground">{project.client}</p>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Wrench className="size-4" />
                    <span>Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <span key={t} className="retro-chip text-retro-cream">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Stills gallery */}
        {project.images.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
              <p className="font-mono text-xs tracking-[0.4em] text-retro-cyan uppercase mb-6">
                ⏵ Stills
              </p>
            </div>
            <div className="space-y-6 md:space-y-10">
              {project.images.map((image, index) => (
                <ScrollReveal key={image.id} delay={index * 0.08}>
                  <ImageWithLightbox
                    image={image}
                    onClick={() => openLightbox(index)}
                    priority={index === 0}
                    index={0}
                    className="w-full"
                  />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Prev / next */}
        <section className="border-t border-border py-10 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            {adjacent.prev ? (
              <Link
                to={`/project/${adjacent.prev.slug}`}
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-retro-orange transition-colors"
              >
                <ArrowRight className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                <span>{adjacent.prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            <Link
              to="/portfolio"
              className="font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:text-retro-orange transition-colors"
            >
              All Projects
            </Link>
            {adjacent.next ? (
              <Link
                to={`/project/${adjacent.next.slug}`}
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-retro-orange transition-colors"
              >
                <span>{adjacent.next.title}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </section>

        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  );
}
