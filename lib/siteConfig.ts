export const siteConfig = {
  name: 'Webwillfixit',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://webwillfixit.com',
  displayEmail: 'wacar.abbasi@proton.me',
  emails: ['laraibrafique090@gmail.com', 'wacar.abbasi@proton.me'],
  phoneDisplay: '+44 7793 245441',
  phoneTel: '+447793245441',
  whatsappNumber: '447793245441',
  whatsappUrl:
    'https://wa.me/447793245441?text=Hello%20Webwillfixit%2C%20I%20would%20like%20to%20discuss%20a%20project.',
  hours: 'Mon – Fri, 9am – 6pm (UK)',
  responseTime: 'Replies within 1 working day',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61596518488529',
    instagram: 'https://www.instagram.com/webwillfixit/',
  },
};

export const CONTACT_RECIPIENTS: string[] = process.env.CONTACT_TO_EMAILS
  ? process.env.CONTACT_TO_EMAILS.split(',').map((e) => e.trim()).filter(Boolean)
  : siteConfig.emails;
