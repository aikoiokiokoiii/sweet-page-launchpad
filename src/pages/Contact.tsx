import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { photographerInfo } from '@/data/photographer';
import { ContactForm } from '@/components/forms/ContactForm';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Contact() {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);

  const copy = async (value: string, key: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <SEOHead
        title="Contact"
        description={`Get in touch with ${photographerInfo.name} for video editing, filmmaking, and creative direction. ${photographerInfo.availability}`}
      />

      <div className="min-h-screen">
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border grain-overlay">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-mono text-xs tracking-[0.4em] text-retro-orange uppercase mb-4">
                ⏵ Let's Talk
              </p>
              <h1 className="headline text-5xl md:text-6xl lg:text-7xl mb-4">Get in Touch</h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                Pitch a project. Send a brief. Or just say hi.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-3">
                  <h2 className="headline text-3xl md:text-4xl">Send a Message</h2>
                  <p className="text-muted-foreground font-light">
                    Fill out the form and I'll get back to you within 24–48 hours.{' '}
                    {photographerInfo.availability}
                  </p>
                </div>

                <ContactForm />
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <h2 className="headline text-3xl md:text-4xl">Direct Lines</h2>
                  <p className="text-muted-foreground font-light">
                    Skip the form — reach out directly. Click to copy or use the buttons below.
                  </p>
                </div>

                <Separator />

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm border border-retro-orange/40 text-retro-orange">
                      <Mail className="size-5" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Email
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={`mailto:${photographerInfo.email}`}
                          className="text-base md:text-lg font-light hover:text-retro-orange transition-colors break-all"
                        >
                          {photographerInfo.email}
                        </a>
                        <button
                          type="button"
                          onClick={() => copy(photographerInfo.email, 'email')}
                          className="p-1.5 text-muted-foreground hover:text-retro-orange transition-colors"
                          aria-label="Copy email"
                        >
                          {copied === 'email' ? (
                            <Check className="size-4" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm border border-retro-cyan/40 text-retro-cyan">
                      <Phone className="size-5" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Phone
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={`tel:${photographerInfo.phone}`}
                          className="text-base md:text-lg font-light hover:text-retro-cyan transition-colors"
                        >
                          {photographerInfo.phone}
                        </a>
                        <button
                          type="button"
                          onClick={() => copy(photographerInfo.phone, 'phone')}
                          className="p-1.5 text-muted-foreground hover:text-retro-cyan transition-colors"
                          aria-label="Copy phone"
                        >
                          {copied === 'phone' ? (
                            <Check className="size-4" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm border border-border text-muted-foreground">
                      <MapPin className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Location
                      </p>
                      <p className="text-base md:text-lg font-light">
                        {photographerInfo.location}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="border border-retro-orange/40 bg-card p-5 space-y-2">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-retro-orange">
                    ⏵ Availability
                  </p>
                  <p className="text-sm font-light text-muted-foreground">
                    {photographerInfo.availability}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}
