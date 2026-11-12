'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Chatbot.module.css';

interface Message {
  id: string;
  who: 'bot' | 'me';
  text: string;
  isHtml?: boolean;
}

const MAIN_CHIPS = ['Our services', 'Pricing', 'How long does it take?', 'Get a quote'];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const flowRef = useRef<string | null>(null);
  const leadRef = useRef<{ name?: string; email?: string; need?: string; msg?: string }>({});

  const scrollToBottom = () => {
    setTimeout(() => {
      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }, 50);
  };

  const addMsg = React.useCallback((text: string, who: 'bot' | 'me', isHtml = false) => {
    setMessages((prev) => [...prev, { id: Math.random().toString(36).substring(2), who, text, isHtml }]);
    scrollToBottom();
  }, []);

  const botReply = React.useCallback((text: string, quickChips: string[] = [], isHtml = false) => {
    setIsTyping(true);
    setChips([]);
    scrollToBottom();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReducedMotion ? 0 : Math.min(1400, 500 + text.length * 8);

    setTimeout(() => {
      setIsTyping(false);
      addMsg(text, 'bot', isHtml);
      setChips(quickChips);
      scrollToBottom();
    }, delay);
  }, [addMsg]);

  const botReplyRef = useRef(botReply);
  useEffect(() => {
    botReplyRef.current = botReply;
  }, [botReply]);

  const startLead = React.useCallback(() => {
    flowRef.current = 'name';
    leadRef.current = {};
    botReplyRef.current("Great! Let's get you a quote. What's your name?");
  }, []);

  const handleLead = React.useCallback(async (text: string) => {
    if (flowRef.current === 'name') {
      leadRef.current.name = text.slice(0, 60);
      flowRef.current = 'email';
      botReplyRef.current(`Nice to meet you, ${leadRef.current.name}! What's your email address?`);
    } else if (flowRef.current === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        botReplyRef.current("That email doesn't look right. Could you check it? (e.g. name@company.com)");
        return;
      }
      leadRef.current.email = text;
      flowRef.current = 'need';
      botReplyRef.current('Thanks! Which service do you need?', [
        'Web Development',
        'AI Automation',
        'AI Chatbots',
        'AI Videos',
        'Video Editing',
        'Social Media Marketing',
      ]);
    } else if (flowRef.current === 'need') {
      leadRef.current.need = text.slice(0, 80);
      flowRef.current = 'msg';
      botReplyRef.current('Got it. Tell us a little about your project in one or two lines.', ['Skip']);
    } else if (flowRef.current === 'msg') {
      leadRef.current.msg = text === 'Skip' ? '' : text;
      flowRef.current = null;

      const currentLead = { ...leadRef.current };
      setIsTyping(true);

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: currentLead.name || 'Anonymous',
            email: currentLead.email,
            service: currentLead.need,
            message: currentLead.msg,
            source: 'chatbot',
          }),
        });

        const data = await res.json();
        setIsTyping(false);

        if (res.ok && data.success) {
          botReplyRef.current(
            `Thank you, ${currentLead.name}! ✅\nHere's what I've noted:\n• Email: ${currentLead.email}\n• Service: ${currentLead.need}${currentLead.msg ? '\n• Project: ' + currentLead.msg : ''}\n\nOur team replies within one working day.`,
            ['Our services', 'See portfolio']
          );
        } else {
          botReplyRef.current(
            `Sorry ${currentLead.name}, we encountered an issue sending your details: ${data.error || 'Server error'}. Please try again or email us directly.`,
            ['Get a quote', 'Our services']
          );
        }
      } catch (err) {
        setIsTyping(false);
        console.error(err);
        botReplyRef.current(
          `Sorry ${currentLead.name}, there was a connection problem. Please try again or contact us directly on /contact.`,
          ['Get a quote', 'Our services']
        );
      }
    }
  }, []);

  const handleSend = React.useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    addMsg(trimmed, 'me');
    setInputVal('');

    const map: Record<string, string> = {
      'Our services': 'service',
      'Pricing': 'price',
      'Get a quote': 'quote',
      'See portfolio': 'portfolio',
      'How long does it take?': 'how long',
      'See all services': 'allsvc',
      'Try again': 'quote',
    };

    if (flowRef.current) {
      handleLead(trimmed);
      return;
    }

    const t = (map[trimmed] || trimmed).toLowerCase();

    if (/allsvc/.test(t)) {
      botReplyRef.current('Here\'s the <a href="/services">full services page</a> with what\'s included in each.', ['Get a quote'], true);
    } else if (/\b(hi|hello|hey|salam|assalam|aoa)\b/.test(t)) {
      botReplyRef.current('Hello! 👋 How can I help you today?', MAIN_CHIPS);
    } else if (/(price|pricing|cost|how much|budget|rate|kitn|charges|fee)/.test(t)) {
      botReplyRef.current(
        "Every project is different, so we give a fixed quote after a short free call. You'll know the full price before we start, with no hidden extras.\n\nWant a quote? I just need your name and email.",
        ['Get a quote', 'Our services']
      );
    } else if (/(how long|time|timeline|deadline|kab tak|days|weeks)/.test(t)) {
      botReplyRef.current(
        "Typical timelines:\n• Websites: 2–6 weeks\n• Chatbots: 1–3 weeks\n• Automations: 1–4 weeks\n• AI videos: 3–7 days\n• Video edits: 2–5 days per batch",
        ['Get a quote', 'Our services']
      );
    } else if (/(chat ?bot|bot|whatsapp|assistant)/.test(t)) {
      botReplyRef.current(
        "We build AI chatbots for websites, WhatsApp and Instagram. They're trained on your own products and FAQs, answer 24/7 and collect leads, just like me! 😊",
        ['Get a quote', 'See portfolio']
      );
    } else if (/(automat|n8n|zapier|workflow|crm|postly)/.test(t)) {
      botReplyRef.current(
        'We automate repetitive work: lead capture, CRM updates, invoices, reports and social media posting. Our own platform Postly publishes to six social networks automatically.',
        ['See portfolio', 'Get a quote']
      );
    } else if (/(website|web site|web dev|shopify|ecommerce|e-commerce|store|landing|wordpress)/.test(t)) {
      botReplyRef.current(
        'We build fast, premium websites, Shopify and WooCommerce stores, landing pages and custom web apps. All responsive and SEO-ready.',
        ['See portfolio', 'Get a quote']
      );
    } else if (/(video|edit|reel|youtube|tiktok|avatar)/.test(t)) {
      botReplyRef.current(
        'We do AI videos (avatar presenters, product ads, voiceovers) and video editing for Reels, Shorts and YouTube with captions and motion graphics.',
        ['Get a quote', 'Our services']
      );
    } else if (/(social|marketing|ads|instagram|facebook|meta|smm|seo)/.test(t)) {
      botReplyRef.current(
        'Our social media team plans and designs your content, posts it, and runs Meta and TikTok ads, with a simple report every month.',
        ['Get a quote', 'Our services']
      );
    } else if (/(design|logo|brand|graphic)/.test(t)) {
      botReplyRef.current(
        'Yes, our graphic designer creates logos, brand kits, social media posts and print designs.',
        ['Get a quote', 'Our services']
      );
    } else if (/(service|what do you do|offer|kya karte)/.test(t)) {
      botReplyRef.current(
        'We offer six services:\n1. Web Development\n2. AI Automation\n3. AI Chatbots\n4. AI Videos\n5. Video Editing\n6. Social Media Marketing',
        ['Pricing', 'Get a quote', 'See all services']
      );
    } else if (/(portfolio|work|project|example|case)/.test(t)) {
      botReplyRef.current(
        'You can see our real projects, including Postly, Bits\'N\'Bobs, Viralzy and TIMERA, on the <a href="/portfolio">Portfolio page</a>.',
        ['Get a quote'],
        true
      );
    } else if (/(where|location|based|uk|country|pakistan|office)/.test(t)) {
      botReplyRef.current(
        "We're a UK-registered agency working with clients worldwide, online and across time zones.",
        ['Get a quote', 'Our services']
      );
    } else if (/(quote|start|hire|contact|call|talk|human|person|team|book)/.test(t)) {
      startLead();
    } else if (/(thank|thanks|shukria)/.test(t)) {
      botReplyRef.current("You're welcome! Anything else I can help with?", MAIN_CHIPS);
    } else {
      botReplyRef.current(
        "Good question! I'm not sure about that one, but our team can answer it. Want me to pass it on?",
        ['Get a quote', 'Our services']
      );
    }
  }, [addMsg, handleLead, startLead]);

  const openChat = React.useCallback(() => {
    setIsOpen(true);
    setShowTip(false);
    if (!started) {
      setStarted(true);
      botReplyRef.current(
        "Hi! 👋 I'm the Webwillfixit assistant.\nAsk me about our services, pricing or timelines, or I can get you a free quote.",
        MAIN_CHIPS
      );
    }
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 300);
  }, [started]);

  const closeChat = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Expose openChat globally
    (window as unknown as { openChat?: () => void }).openChat = openChat;

    const timer = setTimeout(() => {
      if (!isOpen && !started) {
        setShowTip(true);
      }
    }, 6000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      delete (window as unknown as { openChat?: () => void }).openChat;
    };
  }, [isOpen, started, openChat, closeChat]);

  return (
    <>
      <button
        type="button"
        className={styles.launch}
        id="cbLaunch"
        aria-label="Chat with Webwillfixit"
        aria-expanded={isOpen}
        aria-controls="cbPanel"
        onClick={() => (isOpen ? closeChat() : openChat())}
      >
        <svg viewBox="0 0 24 24">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
        </svg>
        <span className={styles.dot} />
      </button>

      {showTip && !isOpen && (
        <div className={styles.tip} id="cbTip" onClick={openChat}>
          Hi! Got a question? 👋
        </div>
      )}

      {isOpen && (
        <section
          className={styles.panel}
          id="cbPanel"
          role="dialog"
          aria-label="Webwillfixit assistant"
          data-lenis-prevent
        >
          <div className={styles.head}>
            <div className={styles.av}>
              <svg viewBox="0 0 48 36" aria-hidden="true">
                <path
                  d="M2 4h8l7 20 4-11"
                  fill="none"
                  stroke="#140e00"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13l5-9 9 26 11-26"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <b>Webwillfixit Assistant</b>
              <span>● Online, replies instantly</span>
            </div>
            <button
              type="button"
              className={styles.close}
              id="cbClose"
              aria-label="Close chat"
              onClick={closeChat}
            >
              ✕
            </button>
          </div>

          <div ref={logRef} className={styles.log} id="cbLog" aria-live="polite">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.msg} ${m.who === 'bot' ? styles.bot : styles.me}`}
              >
                {m.isHtml ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: m.text }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName === 'A') {
                        closeChat();
                      }
                    }}
                  />
                ) : (
                  m.text
                )}
              </div>
            ))}
            {isTyping && (
              <div className={styles.typing}>
                <i />
                <i />
                <i />
              </div>
            )}
          </div>

          <div className={styles.quick} id="cbQuick">
            {chips.map((chipText) => (
              <button key={chipText} type="button" onClick={() => handleSend(chipText)}>
                {chipText}
              </button>
            ))}
          </div>

          <form
            className={styles.form}
            id="cbForm"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
          >
            <input
              ref={inputRef}
              id="cbInput"
              placeholder="Type your message…"
              aria-label="Your message"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" aria-label="Send">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </section>
      )}
    </>
  );
}
