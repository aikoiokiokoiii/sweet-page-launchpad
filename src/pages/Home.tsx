import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';

/**
 * Home — cinematic hero with subtle grain + featured projects.
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative h-screen w-full overflow-hidden grain-overlay scanlines">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.pexels.com/videos/2675516/free-video-2675516.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.opacity = '0';
              }}
            >
              <source
                src="https://videos.pexels.com/video-files/2675516/2675516-sd_960_540_24fps.mp4"
                type="video/mp4"
              />
            </video>
            {/* Cinematic gradient + slight color cast */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(var(--background)/0.8)_100%)]" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
            <motion.div
              className="text-center space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.p
                className="font-mono text-xs md:text-sm tracking-[0.4em] text-retro-orange uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                ⏵ Reel · 2024 / 2025
              </motion.p>

              <motion.h1
                className="headline text-5xl md:text-7xl lg:text-8xl text-retro-cream leading-[0.95]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {photographerInfo.name.toUpperCase()}
              </motion.h1>

              <motion.p
                className="text-base md:text-xl font-light tracking-wide text-retro-cream/85"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Video Editor · Filmmaker · Creative Director
              </motion.p>

              <motion.p
                className="text-sm md:text-base font-light leading-relaxed text-retro-cream/70 max-w-2xl mx-auto italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                “{photographerInfo.tagline}”
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-retro-orange text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] hover:bg-retro-orange/90 transition-colors hover-glitch"
                >
                  View Work
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-retro-cream/40 text-retro-cream font-mono text-xs uppercase tracking-[0.2em] hover:bg-retro-cream/10 transition-colors"
                >
                  <Mail className="size-4" />
                  Hire Me
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background relative grain-overlay">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="font-mono text-xs tracking-[0.4em] text-retro-cyan uppercase">
                  ⏵ About
                </p>
                <h2 className="headline text-3xl md:text-5xl">
                  Story First. <span className="text-retro-orange">Always.</span>
                </h2>
                <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground">
                  <p>{photographerInfo.biography.split('\n\n')[0]}</p>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-base font-mono uppercase tracking-[0.2em] text-foreground hover:text-retro-orange transition-colors group"
                >
                  <span>More about me</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured */}
        <section className="py-24 md:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <p className="font-mono text-xs tracking-[0.4em] text-retro-orange uppercase">
                ⏵ Selected Work
              </p>
              <h2 className="headline text-4xl md:text-5xl">Featured Projects</h2>
              <p className="text-lg text-muted-foreground font-light tracking-wide">
                Recent edits, films, and the occasional 3 a.m. experiment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 px-3 md:px-5">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
                index={index}
              />
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-foreground hover:text-retro-orange transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
