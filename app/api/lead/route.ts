import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('A valid email address is required').max(150),
  phone: z.string().max(50).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  service: z.string().max(100).optional().nullable(),
  services: z.array(z.string()).optional(),
  budget: z.string().max(50).optional().nullable(),
  timeline: z.string().max(50).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  source: z.string().max(50).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const leadData = {
      ...result.data,
      receivedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.log('--- [LEAD RECEIVED (N8N_WEBHOOK_URL not configured)] ---');
      console.log(JSON.stringify(leadData, null, 2));
      console.log('-------------------------------------------------------');
      return NextResponse.json(
        {
          success: true,
          message: 'Lead received successfully (logged to server console)',
        },
        { status: 200 }
      );
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        console.error(`Webhook returned status ${response.status}`);
        return NextResponse.json(
          {
            success: false,
            error: `Webhook notification failed with status ${response.status}`,
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Lead submitted successfully',
        },
        { status: 200 }
      );
    } catch (webhookErr) {
      console.error('Failed to forward lead to webhook:', webhookErr);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to contact webhook endpoint',
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('Error handling lead submission:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request body or server error',
      },
      { status: 500 }
    );
  }
}

