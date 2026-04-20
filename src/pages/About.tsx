import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Award, Wrench, Sparkles } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`Learn about ${photographerInfo.name}, ${photographerInfo.tagline}. ${photographerInfo.biography.split('\n\n')[0]}`}
        image={photographerInfo.portraitImage}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border grain-overlay">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-mono text-xs tracking-[0.4em] text-retro-orange uppercase mb-4">
                ⏵ Profile
              </p>
              <h1 className="headline text-5xl md:text-6xl lg:text-7xl mb-4">About</h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                Video Editor · Filmmaker · Creative Director
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portrait + Bio */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted grain-overlay">
                  <img
                    src={photographerInfo.portraitImage}
                    alt={photographerInfo.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.3em] text-retro-cream">
                    {photographerInfo.location}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {photographerInfo.socialLinks.instagram && (
                    <a
                      href={photographerInfo.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="size-5" />
                    </a>
                  )}
                  {photographerInfo.socialLinks.youtube && (
                    <a
                      href={photographerInfo.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="size-5" />
                    </a>
                  )}
                  {photographerInfo.socialLinks.linkedin && (
                    <a
                      href={photographerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <h2 className="headline text-4xl md:text-5xl">{photographerInfo.name}</h2>
                  <p className="text-xl text-muted-foreground font-light tracking-wide italic">
                    “{photographerInfo.tagline}”
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="retro-chip text-retro-orange">
                    {photographerInfo.yearsExperience}+ Years
                  </span>
                  <span className="retro-chip text-retro-cyan">{photographerInfo.location}</span>
                </div>

                <Separator />

                <div className="space-y-4">
                  {photographerInfo.biography.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-2 space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-muted-foreground">Email · </span>
                    <a
                      href={`mailto:${photographerInfo.email}`}
                      className="text-retro-orange hover:underline"
                    >
                      {photographerInfo.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone · </span>
                    <a
                      href={`tel:${photographerInfo.phone}`}
                      className="hover:text-retro-orange transition-colors"
                    >
                      {photographerInfo.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills + Tools */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border bg-card/40">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-5 text-retro-orange" />
                  <h3 className="headline text-2xl">Skills</h3>
                </div>
                <ul className="space-y-3">
                  {photographerInfo.skills.map((s) => (
                    <li
                      key={s}
                      className="flex items-baseline gap-3 text-base font-light border-b border-border/60 pb-2"
                    >
                      <span className="font-mono text-xs text-retro-orange">▸</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Wrench className="size-5 text-retro-cyan" />
                  <h3 className="headline text-2xl">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {photographerInfo.tools.map((t) => (
                    <span key={t} className="retro-chip text-retro-cream">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Experience / Awards */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto space-y-8">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <Award className="size-5 text-retro-orange" />
                <h3 className="headline text-2xl">Experience & Recognition</h3>
              </div>
              <ul className="space-y-3 font-light text-base">
                {photographerInfo.awards.map((a) => (
                  <li key={a} className="flex gap-3 border-b border-border/60 pb-3">
                    <span className="font-mono text-xs text-retro-cyan mt-1">●</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border bg-card/40">
          <div className="max-w-6xl mx-auto space-y-10">
            <ScrollReveal>
              <div className="text-center space-y-2">
                <p className="font-mono text-xs tracking-[0.4em] text-retro-orange uppercase">
                  ⏵ Services
                </p>
                <h3 className="headline text-3xl md:text-4xl">What I Edit</h3>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photographerInfo.services.map((s, i) => (
                <ScrollReveal key={s.title} delay={i * 0.05}>
                  <div className="border border-border bg-background p-6 hover:border-retro-orange/60 transition-colors h-full">
                    <h4 className="headline text-lg mb-2">{s.title}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border">
          <div className="max-w-6xl mx-auto space-y-10">
            <ScrollReveal>
              <div className="text-center space-y-2">
                <p className="font-mono text-xs tracking-[0.4em] text-retro-cyan uppercase">
                  ⏵ Pricing
                </p>
                <h3 className="headline text-3xl md:text-4xl">Project Tiers</h3>
                <p className="text-muted-foreground font-light max-w-xl mx-auto">
                  Transparent starting points. Final quotes adjust to scope, footage, and timeline.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-4">
              {photographerInfo.pricing.map((tier, i) => (
                <ScrollReveal key={tier.name} delay={i * 0.08}>
                  <div
                    className={`relative border ${
                      tier.highlight ? 'border-retro-orange' : 'border-border'
                    } bg-card p-6 h-full flex flex-col`}
                  >
                    {tier.highlight && (
                      <div className="absolute -top-3 left-4 retro-chip bg-retro-orange text-primary-foreground border-retro-orange">
                        Most Popular
                      </div>
                    )}
                    <h4 className="headline text-2xl">{tier.name}</h4>
                    <p className="text-sm text-muted-foreground font-light mb-4">{tier.tagline}</p>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="headline text-3xl text-retro-orange">{tier.price}</span>
                      <span className="font-mono text-xs text-muted-foreground">/ project</span>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
                      {tier.turnaround} · {tier.revisions}
                    </p>
                    <ul className="space-y-2 text-sm font-light flex-1">
                      {tier.deliverables.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span className="text-retro-cyan">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
