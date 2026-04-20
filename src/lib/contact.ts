import type { ContactSubmission } from '@/types';
import { photographerInfo } from '@/data/photographer';
import { supabase } from '@/integrations/supabase/client';

/**
 * Single source of truth for sending contact-form messages.
 *
 * Calls the `send-contact-email` Edge Function which uses the Resend
 * connector (via Lovable's connector gateway) to deliver the message to
 * Andrew. The sender is `onboarding@resend.dev` for now — to switch to a
 * custom domain, only the FROM_ADDRESS in the Edge Function needs to change.
 */

export const RECIPIENT_EMAIL = photographerInfo.email;

export class ContactSendError extends Error {
  constructor(message: string, public details?: unknown) {
    super(message);
    this.name = 'ContactSendError';
  }
}

export async function sendContactMessage(submission: ContactSubmission): Promise<void> {
  const { data, error } = await supabase.functions.invoke('send-contact-email', {
    body: {
      name: submission.name,
      email: submission.email,
      projectType: submission.projectType,
      message: submission.message,
    },
  });

  if (error) {
    throw new ContactSendError(error.message || 'Failed to send message', error);
  }
  if (data && (data as { error?: string }).error) {
    throw new ContactSendError((data as { error: string }).error, data);
  }
}
