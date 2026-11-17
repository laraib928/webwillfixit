export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  submittedAt?: Date;
}

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatUkTime(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    return date.toUTCString();
  }
}

export function renderContactEmail(data: ContactEmailData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : '';
  const safeService = data.service ? escapeHtml(data.service) : '';
  const safeCompany = data.company ? escapeHtml(data.company) : '';
  const safeMessage = data.message ? escapeHtml(data.message) : '';
  const ukTime = formatUkTime(data.submittedAt || new Date());

  const phoneDigits = data.phone ? data.phone.replace(/\D/g, '') : '';
  const whatsAppUrl = phoneDigits ? `https://wa.me/${phoneDigits}` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New enquiry from ${safeName}</title>
</head>
<body style="margin:0;padding:24px 0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;color:#1f2937;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,0.06);margin:0 auto;">
          
          <!-- Header Band -->
          <tr>
            <td style="background-color:#0b0b0b;padding:26px 32px;text-align:left;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;letter-spacing:-0.5px;color:#ffffff;display:inline-block;">
                      Web<span style="color:#ffc21a;">will</span>fixit
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#ffc21a;background-color:#1c1c1c;padding:5px 12px;border-radius:999px;border:1px solid #333333;display:inline-block;">
                      New website enquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro & Details Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:#374151;">
                You have received a new message from the <strong>Webwillfixit</strong> contact form.
              </p>

              <!-- Details Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:28px;">
                <tr>
                  <td width="30%" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:15px;color:#111827;font-weight:600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:15px;color:#111827;">
                    <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;font-weight:500;">${safeEmail}</a>
                  </td>
                </tr>
                ${safePhone ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Phone</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:15px;color:#111827;">
                    <a href="tel:${safePhone}" style="color:#2563eb;text-decoration:none;">${safePhone}</a>
                  </td>
                </tr>
                ` : ''}
                ${safeCompany ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Company</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:15px;color:#111827;">${safeCompany}</td>
                </tr>
                ` : ''}
                ${safeService ? `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Service / Subject</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:15px;color:#111827;font-weight:600;">${safeService}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Submitted at</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#4b5563;">${ukTime} (UK Time)</td>
                </tr>
              </table>

              <!-- Message Section -->
              ${safeMessage ? `
              <div style="margin-bottom:28px;">
                <div style="font-size:13px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Message</div>
                <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:18px;font-size:15px;line-height:1.6;color:#1f2937;white-space:pre-wrap;word-break:break-word;">${safeMessage}</div>
              </div>
              ` : ''}

              <!-- Action Buttons -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-top:16px;">
                <tr>
                  <td style="padding-right:12px;padding-bottom:12px;">
                    <a href="mailto:${safeEmail}" style="background-color:#ffc21a;color:#111111;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 24px;border-radius:6px;display:inline-block;border:1px solid #e0a300;">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                  ${whatsAppUrl ? `
                  <td style="padding-bottom:12px;">
                    <a href="${whatsAppUrl}" target="_blank" rel="noopener noreferrer" style="background-color:#25D366;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 22px;border-radius:6px;display:inline-block;">
                      WhatsApp
                    </a>
                  </td>
                  ` : ''}
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;line-height:1.5;">
                Sent from the Webwillfixit website contact form
              </p>
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                <a href="https://webwillfixit.com" style="color:#6b7280;text-decoration:underline;">webwillfixit.com</a> &middot; UK-led Complete Digital Solutions
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderContactEmailText(data: ContactEmailData): string {
  const ukTime = formatUkTime(data.submittedAt || new Date());
  const lines: string[] = [
    '========================================',
    'NEW WEBSITE ENQUIRY - WEBWILLFIXIT',
    '========================================',
    '',
    `Name:         ${data.name}`,
    `Email:        ${data.email}`,
    data.phone ? `Phone:        ${data.phone}` : '',
    data.company ? `Company:      ${data.company}` : '',
    data.service ? `Service:      ${data.service}` : '',
    data.budget ? `Budget:       ${data.budget}` : '',
    data.timeline ? `Timeline:     ${data.timeline}` : '',
    `Submitted at: ${ukTime} (UK Time)`,
    '',
    '----------------------------------------',
    'MESSAGE:',
    '----------------------------------------',
    data.message || '(No message provided)',
    '',
    '----------------------------------------',
    `Reply to: mailto:${data.email}`,
    data.phone ? `WhatsApp: https://wa.me/${data.phone.replace(/\D/g, '')}` : '',
    '========================================',
    'Sent from the Webwillfixit website contact form (https://webwillfixit.com)',
  ];

  return lines.filter((l) => l !== '').join('\n');
}
