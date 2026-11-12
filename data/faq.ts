export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'How much does a project cost?',
    answer: "Every business is different, so we send a fixed quote after a free call. You'll know the full price before any work starts.",
  },
  {
    question: 'Do you work with clients outside the UK?',
    answer: "Yes. We're UK-registered and work with clients worldwide, online, across time zones.",
  },
  {
    question: 'Can I update the website myself?',
    answer: 'Yes. We set up an easy editor where possible and show you how to change text, images and products.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We offer monthly care plans for updates, fixes, backups and improvements, or you can call us when you need us.',
  },
  {
    question: 'How do payments work?',
    answer: 'Usually a deposit to start and the rest on delivery. Monthly services like social media are billed each month.',
  },
];

