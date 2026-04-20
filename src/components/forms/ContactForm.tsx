import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { sendContactMessage } from '@/lib/contact';

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  projectType: z.enum(['music-video', 'commercial', 'short-film', 'youtube', 'other'], {
    required_error: 'Please select a project type',
  }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000, { message: 'Message must be less than 2000 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const PROJECT_TYPE_OPTIONS: { value: ContactFormValues['projectType']; label: string }[] = [
  { value: 'music-video', label: 'Music Video' },
  { value: 'commercial', label: 'Commercial / Ad' },
  { value: 'short-film', label: 'Short Film' },
  { value: 'youtube', label: 'YouTube / Creator' },
  { value: 'other', label: 'Other' },
];

/**
 * Contact form with retro styling, loading/success/error states,
 * and a mailto-based send fallback. The send pipeline lives in
 * `src/lib/contact.ts` so swapping in Resend later only touches one file.
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: undefined,
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await sendContactMessage({
        name: data.name,
        email: data.email,
        projectType: data.projectType,
        message: data.message,
        timestamp: new Date(),
      });

      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      form.setError('root', {
        message: `Something went wrong. Please try again, or email me directly at andrewnicolesanosa@gmail.com. (${msg})`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className="border border-retro-orange/60 bg-card p-8 text-center space-y-4 grain-overlay"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="size-14 mx-auto text-retro-orange" />
        </motion.div>
        <h3 className="headline text-2xl">Message Sent</h3>
        <p className="text-muted-foreground font-light leading-relaxed">
          Your message has been sent successfully. I'll get back to you within 24–48 hours.
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          ⏵ Delivered to Andrew's inbox
        </p>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xs uppercase tracking-[0.2em]">Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" className="font-light" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xs uppercase tracking-[0.2em]">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="font-light"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xs uppercase tracking-[0.2em]">
                Project Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="font-light">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-popover z-50">
                  {PROJECT_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="font-light">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-mono text-xs uppercase tracking-[0.2em]">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project — timeline, style references, footage..."
                  className="min-h-32 font-light resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-light" />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="flex items-start gap-2 text-sm text-destructive font-light border border-destructive/40 bg-destructive/10 p-3">
            <AlertCircle className="size-4 mt-0.5 shrink-0" />
            <span>{form.formState.errors.root.message}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full py-6 font-mono text-xs uppercase tracking-[0.25em] bg-retro-orange text-primary-foreground hover:bg-retro-orange/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </Button>

        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground text-center">
          ⏵ Or email me directly at{' '}
          <a href="mailto:andrewnicolesanosa@gmail.com" className="text-retro-orange hover:underline">
            andrewnicolesanosa@gmail.com
          </a>
        </p>
      </form>
    </Form>
  );
}
