import type { ContactSubmission } from '@/types';
import { photographerInfo } from '@/data/photographer';

/**
 * Single source of truth for sending contact-form messages.
 *
 * Current implementation: opens the user's mail client with a clean,
 * pre-filled message addressed to Andrew. This works with no backend.
 *
 * To upgrade to Resend (or any server-side email):
 *   1. Enable Lovable Cloud + connect Resend.
 *   2. Add a `send-contact-email` Edge Function that calls the Resend API.
 *   3. Replace the body of `sendContactMessage` with a `supabase.functions.invoke(...)` call.
 *   4. Keep this function's signature — no other UI code needs to change.
 */

const RECIPIENT = photographerInfo.email; // andrewnicolesanosa@gmail.com
// Sender label used by the future Resend integration.
// onboarding@resend.dev works without a verified domain; swap to a custom
// domain (e.g. hello@andrewsanosa.com) once you verify one in Resend.
export const FROM_ADDRESS = 'onboarding@resend.dev';

const PROJECT_TYPE_LABELS: Record<ContactSubmission['projectType'], string> = {
  'music-video': 'Music Video',
  commercial: 'Commercial / Ad',
  'short-film': 'Short Film',
  youtube: 'YouTube / Creator',
  other: 'Other',
};

function buildEmailBody(submission: ContactSubmission): string {
  const lines = [
    `Hi Andrew,`,
    ``,
    submission.message,
    ``,
    `— ${submission.name}`,
    ``,
    `------`,
    `Sent from andrewsanosa portfolio`,
    `Project type: ${PROJECT_TYPE_LABELS[submission.projectType]}`,
    `Reply-to: ${submission.email}`,
    `Timestamp: ${submission.timestamp.toISOString()}`,
  ];
  return lines.join('\n');
}

function buildSubject(submission: ContactSubmission): string {
  return `New ${PROJECT_TYPE_LABELS[submission.projectType]} inquiry — ${submission.name}`;
}

export async function sendContactMessage(submission: ContactSubmission): Promise<void> {
  const subject = buildSubject(submission);
  const body = buildEmailBody(submission);

  const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Trigger the mail client. window.location is the most reliable
  // cross-browser approach for mailto: links.
  if (typeof window !== 'undefined') {
    window.location.href = mailto;
  }

  // Resolve immediately — there is no server roundtrip in this mode.
  return Promise.resolve();
}
