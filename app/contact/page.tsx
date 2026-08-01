'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock3, Mail, Minus, Plus, Send, ShieldCheck } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

const quickAnswers = [
  ['Do you require prepayment?', 'Yes. The payment structure is confirmed before production or campaign scheduling begins.'],
  ['Can brands provide their own video?', 'Yes. Promotional video share campaigns can use an approved brand-supplied asset when it fits the audience and platform requirements.'],
  ['Can you create custom content?', 'Yes. Custom content campaigns include concept development, production and editing based on the confirmed scope.'],
  ['Can we request long-term support?', 'Yes. Recurring campaigns and sponsorship structures are available through a custom partnership quote.'],
];

const ENDPOINT = 'https://eawftyzjuwccwuxdszxf.supabase.co/functions/v1/submit-page-contact';
const DRAFT_KEY = 'tfm-contact-message-v3';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [reference, setReference] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Record<string, string>;

      Object.entries(saved).forEach(([name, value]) => {
        const field = form.elements.namedItem(name);
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.value = value;
      });
    } catch {
      sessionStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  function saveDraft() {
    const form = formRef.current;
    if (!form || submitState === 'success') return;

    const data = new FormData(form);
    const draft: Record<string, string> = {};
    for (const key of ['name', 'company', 'website', 'email', 'message']) draft[key] = String(data.get(key) || '');
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitState('sending');
    setStatusMessage('Securely sending your message…');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'todayfilmmakers',
          company_website: data.get('company_website'),
          payload: {
            name: data.get('name'),
            company: data.get('company'),
            website: data.get('website'),
            email: data.get('email'),
            message: data.get('message'),
            meta: {
              referrer: document.referrer || 'Direct',
              landingPath: window.location.pathname,
              submitPath: '/contact',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              browserLanguage: navigator.language,
              viewport: `${window.innerWidth}x${window.innerHeight}`,
            },
          },
        }),
      });

      const result = await response.json().catch(() => ({})) as { ok?: boolean; error?: string; reference?: string };
      if (!response.ok || result.ok !== true || !result.reference) throw new Error(result.error || 'We could not receive your message.');

      setReference(result.reference);
      setSubmitState('success');
      setStatusMessage('Message received.');
      sessionStorage.removeItem(DRAFT_KEY);
      form.reset();
    } catch (error) {
      setSubmitState('error');
      setStatusMessage(error instanceof Error ? error.message : 'A connection problem interrupted the submission. Please try again.');
    }
  }

  return <main className="contactPage">
    <div className="grain" />
    <header className="contactNav">
      <a className="contactBrand" href="/" aria-label="Today Film Makers home">
        <Image src="/logo.svg" width={86} height={38} alt="Today Film Makers" priority />
        <span><i /> PARTNERSHIP DESK</span>
      </a>
      <a className="contactBack" href="/"><i><ArrowLeft size={15} /></i><span>Back to media kit</span></a>
    </header>

    <section className="contactHero"><motion.div initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [.16, 1, .3, 1] }}><span className="eyebrow">CONTACT TODAY FILM MAKERS</span><h1>LET&apos;S TALK ABOUT<br />YOUR <i>BRAND.</i></h1><p>Send us a clear message about your company, product or partnership idea. Our team will review it and reply by email.</p></motion.div></section>

    <section className="contactBody"><aside className="contactAside"><div className="contactAsideSticky"><span className="eyebrow">WHAT HAPPENS NEXT</span><h2>Simple contact. Real response.</h2><div className="contactSteps"><div><span>01</span><p>Your message is securely stored in the Today Film Makers workspace.</p></div><div><span>02</span><p>Our team reviews your company, website and message.</p></div><div><span>03</span><p>We reply to your email with the right next step.</p></div></div><div className="contactInfoCards"><article><Clock3 /><div><strong>Response time</strong><span>Usually within 1–2 business days</span></div></article><article><Mail /><div><strong>Direct email</strong><a href="mailto:hello@todayfilmmakers.com">hello@todayfilmmakers.com</a></div></article><article><ShieldCheck /><div><strong>Secure contact</strong><span>Your details are used only to review and reply.</span></div></article></div></div></aside>

      <motion.form ref={formRef} className="campaignForm" onSubmit={submitMessage} onChange={saveDraft} initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .12, ease: [.16, 1, .3, 1] }}>
        <div className="formHeading"><span>CONTACT MESSAGE</span><strong>Secure submission · Draft saved in this browser</strong></div>
        <input className="formHoneypot" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="formGrid">
          <label><span>Full name *</span><input name="name" required minLength={2} maxLength={120} placeholder="Your full name" autoComplete="name" /></label>
          <label><span>Company name *</span><input name="company" required minLength={2} maxLength={180} placeholder="Your company or brand" autoComplete="organization" /></label>
          <label className="fullField"><span>Website link</span><input type="url" name="website" maxLength={500} placeholder="https://yourwebsite.com (optional)" inputMode="url" autoComplete="url" /></label>
          <label className="fullField"><span>Email *</span><input type="email" name="email" required maxLength={254} placeholder="you@company.com" autoComplete="email" /></label>
          <label className="fullField"><span>Message *</span><textarea name="message" required minLength={10} maxLength={5000} rows={8} placeholder="Tell us how we can help or what partnership you have in mind." /></label>
        </div>

        <button type="submit" disabled={submitState === 'sending' || submitState === 'success'}>{submitState === 'sending' ? 'Sending message…' : submitState === 'success' ? 'Message received' : 'Send message'} <Send size={17} /></button>

        <div className={`formStatus ${submitState}`} aria-live="polite" role={submitState === 'error' ? 'alert' : 'status'}>
          {submitState === 'success' ? <><strong>{statusMessage}</strong><span>Reference: {reference}</span><p>We will review your message and reply to the email you provided, usually within 1–2 business days.</p></> : statusMessage ? <p>{statusMessage}</p> : null}
        </div>
      </motion.form>
    </section>

    <section className="contactFaq">
      <div className="faqIntro"><span className="eyebrow">QUICK ANSWERS</span><h2>Good questions.<i>Clear answers.</i></h2><p>Open any question to understand the partnership process before contacting us.</p><div className="faqCounter" aria-hidden="true"><strong>0{openFaq + 1}</strong><span>ACTIVE ANSWER</span></div></div>
      <div className="faqList">{quickAnswers.map(([question, answer], index) => { const isOpen = openFaq === index; return <article className={isOpen ? 'faqItem open' : 'faqItem'} key={question}><button type="button" className="faqQuestion" onClick={() => setOpenFaq(index)} aria-expanded={isOpen}><span>0{index + 1}</span><h3>{question}</h3><i className="faqToggle">{isOpen ? <Minus size={17} /> : <Plus size={17} />}</i></button><AnimatePresence initial={false}>{isOpen && <motion.div className="faqAnswer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .4, ease: [.16, 1, .3, 1] }}><p>{answer}</p></motion.div>}</AnimatePresence></article>; })}</div>
    </section>

    <section className="contactBottomCta"><div><span className="eyebrow">ANOTHER WAY IN</span><h2>YOUR PRODUCT.<br />THE RIGHT CREATIVE AUDIENCE.</h2><a href="mailto:hello@todayfilmmakers.com">Email TFM directly <ArrowRight /></a></div></section>
  </main>;
}
