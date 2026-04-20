import { Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-10 grain-overlay">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-retro-orange">
              ⏵ {photographerInfo.name}
            </p>
            <p className="text-sm text-muted-foreground font-light">
              © {currentYear} · All rights reserved · {photographerInfo.location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${photographerInfo.email}`}
              className="text-muted-foreground hover:text-retro-orange transition-colors"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </a>
            {photographerInfo.socialLinks.instagram && (
              <a
                href={photographerInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-retro-orange transition-colors"
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
                className="text-muted-foreground hover:text-retro-orange transition-colors"
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
                className="text-muted-foreground hover:text-retro-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
