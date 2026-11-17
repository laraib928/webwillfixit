import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { CONTACT_RECIPIENTS } from '@/lib/siteConfig';
import { renderContactEmail, renderContactEmailText } from '@/lib/emailTemplates';

// Simple in-memory rate limiting: 5 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Periodic cleanup if map grows
  if (ipRequestHistory.size > 2000) {
    ipRequestHistory.forEach((timestamps, storedIp) => {
      const valid = timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);
      if (valid.length === 0) {
        ipRequestHistory.delete(storedIp);
      } else {
        ipRequestHistory.set(storedIp, valid);
      }
    });
  }

  const timestamps = ipRequestHistory.get(ip) || [];
  const validTimestamps = timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRequestHistory.set(ip, validTimestamps);
  return false;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(150),
  phone: z.string().trim().max(50).optional().nullable(),
  service: z.string().trim().max(150).optional().nullable(),
  services: z.array(z.string()).optional(),
  message: z.string().trim().max(3000).optional().nullable(),
  company: z.string().trim().max(100).optional().nullable(),
  budget: z.string().trim().max(50).optional().nullable(),
  timeline: z.string().trim().max(50).optional().nullable(),
  // Honeypot fields for anti-spam
  honeypot: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a few minutes before trying again.',
        },
        { status: 429 }
      );
    }

    // 2. Parse & validate body
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstIssue = result.error.issues[0]?.message || 'Invalid form input.';
      return NextResponse.json(
        {
          success: false,
          error: firstIssue,
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Honeypot check (silently drop bot submissions)
    if (data.honeypot || data.website) {
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // Combine services array if service string not provided
    const combinedService =
      data.service ||
      (data.services && data.services.length > 0 ? data.services.join(', ') : undefined);

    const emailPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      service: combinedService,
      company: data.company || undefined,
      budget: data.budget || undefined,
      timeline: data.timeline || undefined,
      message: data.message || undefined,
      submittedAt: new Date(),
    };

    // 4. Send via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || 'Webwillfixit <onboarding@resend.dev>';
    const toRecipients = CONTACT_RECIPIENTS;

    if (!resendApiKey) {
      console.warn(
        '⚠️ RESEND_API_KEY is not set in environment. Contact enquiry logged to console:'
      );
      console.log(JSON.stringify(emailPayload, null, 2));
      return NextResponse.json({
        success: true,
        message: 'Enquiry received (development mode).',
      });
    }

    const resend = new Resend(resendApiKey);

    let emailResult = await resend.emails.send({
      from: fromAddress,
      to: toRecipients,
      replyTo: data.email,
      subject: `New enquiry from ${data.name} - Webwillfixit`,
      html: renderContactEmail(emailPayload),
      text: renderContactEmailText(emailPayload),
    });

    // Handle Resend testing sandbox (onboarding@resend.dev) restriction:
    // Resend free accounts before custom domain verification only permit delivery
    // to the account owner's email. Fallback automatically so testing works smoothly.
    if (
      emailResult.error &&
      emailResult.error.message?.includes('only send testing emails to your own email address')
    ) {
      console.warn(
        '⚠️ Resend Sandbox Notice: Retrying delivery to registered account email (laraibrafique090@gmail.com).'
      );
      emailResult = await resend.emails.send({
        from: fromAddress,
        to: ['laraibrafique090@gmail.com'],
        replyTo: data.email,
        subject: `New enquiry from ${data.name} - Webwillfixit`,
        html: renderContactEmail(emailPayload),
        text: renderContactEmailText(emailPayload),
      });
    }

    if (emailResult.error) {
      console.error('Resend API delivery error:', emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to send message at this time. Please try again shortly.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
      id: emailResult.data?.id,
    });
  } catch (err: unknown) {
    console.error('Server error handling contact submission:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected server error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
