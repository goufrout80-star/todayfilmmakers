'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock3, Mail, Minus, Plus, Send, ShieldCheck } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

const collaborationOptions = ['Promotional video share', 'Custom content creation', 'Product integration', 'Multi-platform campaign', 'Long-term sponsorship', 'Not sure yet'];
const budgetOptions = ['$300–$599', '$600–$1,499', '$1,500–$2,999', '$3,000+', 'Ongoing monthly partnership', 'Not sure, recommend a package'];
const roleOptions = ['Founder / owner', 'Marketing manager', 'Influencer marketing manager', 'Agency / PR', 'Product manager', 'Other'];
const productStatusOptions = ['Already launched', 'Launching soon', 'Private beta', 'Pre-launch'];
const objectiveOptions = ['Brand awareness', 'Product launch', 'Website traffic', 'App registrations', 'Sales', 'Lead generation', 'Content production', 'Long-term visibility'];
const deliverableOptions = ['Instagram Reel', 'Facebook Reel', 'TikTok', 'YouTube Short', 'Stories', 'Cross-platform distribution', 'Custom video production', 'Promotional video share'];
const quickAnswers = [
  ['Do you require prepayment?', 'Yes. The payment structure is confirmed before production or campaign scheduling begins.'],
  ['Can brands provide their own video?', 'Yes. Promotional video share campaigns can use an approved brand-supplied asset when it fits the audience and platform requirements.'],
  ['Can you create custom content?', 'Yes. Custom content campaigns include concept development, production and editing based on the confirmed scope.'],
  ['Can we request long-term support?', 'Yes. Recurring campaigns and sponsorship structures are available through a custom partnership quote.'],
];

const ENDPOINT = 'https://eawftyzjuwccwuxdszxf.supabase.co/functions/v1/submit-page-contact';
const DRAFT_KEY = 'tfm-campaign-brief-v2';

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
      const saved = JSON.parse(raw) as Record<string, string | string[] | boolean>;
      Object.entries(saved).forEach(([name, value]) => {
        if (name === 'deliverables' && Array.isArray(value)) {
          form.querySelectorAll<HTMLInputElement>('input[name="deliverables"]').forEach((input) => { input.checked = value.includes(input.value); });
          return;
        }
        const field = form.elements.namedItem(name);
        if (field instanceof HTMLInputElement) {
          if (field.type === 'checkbox') field.checked = value === true;
          else if (typeof value === 'string') field.value = value;
        } else if (field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
          if (typeof value === 'string') field.value = value;
        }
      });
    } catch {
      sessionStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  function saveDraft() {
    const form = formRef.current;
    if (!form || submitState === 'success') return;
    const data = new FormData(form);
    const draft: Record<string, string | string[] | boolean> = {};
    for (const [key, value] of data.entries()) {
      if (key === 'company_website') continue;
      if (key === 'deliverables') continue;
      draft[key] = String(value);
    }
    draft.deliverables = data.getAll('deliverables').map(String);
    draft.consent = Boolean(data.get('consent'));
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const deliverables = data.getAll('deliverables').map(String);
    if (deliverables.length === 0) {
      setSubmitState('error');
      setStatusMessage('Select at least one requested deliverable.');
      form.querySelector<HTMLInputElement>('input[name="deliverables"]')?.focus();
      return;
    }

    setSubmitState('sending');
    setStatusMessage('Securely sending your campaign brief…');

    const payload = {
      page: 'todayfilmmakers',
      company_website: data.get('company_website'),
      payload: {
        name: data.get('name'),
        company: data.get('company'),
        email: data.get('email'),
        website: data.get('website'),
        contactRole: data.get('contactRole'),
        productStatus: data.get('productStatus'),
        collaboration: data.get('collaboration'),
        budget: data.get('budget'),
        objective: data.get('objective'),
        deliverables,
        targetMarkets: data.get('targetMarkets'),
        timeline: data.get('timeline'),
        brief: data.get('brief'),
        consent: data.get('consent') === 'on',
        meta: {
          referrer: document.referrer || 'Direct',
          landingPath: window.location.pathname,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          browserLanguage: navigator.language,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
        },
      },
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; error?: string; reference?: string };
      if (!response.ok || result.ok !== true || !result.reference) throw new Error(result.error || 'We could not receive your campaign brief.');

      setReference(result.reference);
      setSubmitState('success');
      setStatusMessage('Campaign brief received.');
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
        <span><i /> CAMPAIGN DESK</span>
      </a>
      <a className="contactBack" href="/"><i><ArrowLeft size={15} /></i><span>Back to media kit</span></a>
    </header>

    <section className="contactHero"><motion.div initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [.16, 1, .3, 1] }}><span className="eyebrow">BRAND PARTNERSHIP INQUIRY</span><h1>LET&apos;S BUILD A CAMPAIGN<br />FILMMAKERS WILL <i>REMEMBER.</i></h1><p>Give us the details required to qualify the opportunity, recommend the right format and prepare a useful next step without a long chain of follow-up emails.</p></motion.div></section>

    <section className="contactBody"><aside className="contactAside"><div className="contactAsideSticky"><span className="eyebrow">WHAT HAPPENS NEXT</span><h2>A clear brief creates a stronger campaign.</h2><div className="contactSteps"><div><span>01</span><p>Your brief is securely stored in the TFM partnership workspace.</p></div><div><span>02</span><p>We review product fit, audience, objective, scope, timeline and budget.</p></div><div><span>03</span><p>We reply with the recommended format, deliverables, payment structure and next action.</p></div></div><div className="contactInfoCards"><article><Clock3 /><div><strong>Response time</strong><span>Usually within 1–2 business days</span></div></article><article><Mail /><div><strong>Direct email</strong><a href="mailto:hello@todayfilmmakers.com">hello@todayfilmmakers.com</a></div></article><article><ShieldCheck /><div><strong>Brand-safe process</strong><span>Nothing is published without agreed approval.</span></div></article></div></div></aside>

      <motion.form ref={formRef} className="campaignForm" onSubmit={submitBrief} onChange={saveDraft} initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .12, ease: [.16, 1, .3, 1] }}>
        <div className="formHeading"><span>CAMPAIGN BRIEF</span><strong>Secure submission · Draft saved in this browser</strong></div>
        <input className="formHoneypot" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="formGrid">
          <label><span>Your name *</span><input name="name" required minLength={2} maxLength={120} placeholder="Full name" autoComplete="name" /></label>
          <label><span>Company / brand *</span><input name="company" required minLength={2} maxLength={180} placeholder="Brand name" autoComplete="organization" /></label>
          <label><span>Business email *</span><input type="email" name="email" required maxLength={254} placeholder="you@company.com" autoComplete="email" /></label>
          <label><span>Website or product link</span><input type="url" name="website" maxLength={500} placeholder="https://" inputMode="url" /></label>
          <label><span>Your role *</span><select name="contactRole" required defaultValue=""><option value="" disabled>Select your role</option>{roleOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label><span>Product status *</span><select name="productStatus" required defaultValue=""><option value="" disabled>Select product status</option>{productStatusOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label><span>Collaboration format *</span><select name="collaboration" required defaultValue=""><option value="" disabled>Select a format</option>{collaborationOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label><span>Estimated budget *</span><select name="budget" required defaultValue=""><option value="" disabled>Select a range</option>{budgetOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label className="fullField"><span>Main campaign objective *</span><select name="objective" required defaultValue=""><option value="" disabled>Select the primary objective</option>{objectiveOptions.map(option => <option key={option}>{option}</option>)}</select></label>

          <fieldset className="fullField formFieldset">
            <legend>Requested deliverables *</legend>
            <div className="choiceGrid">{deliverableOptions.map(option => <label className="choiceCard" key={option}><input type="checkbox" name="deliverables" value={option} /><span>{option}</span></label>)}</div>
          </fieldset>

          <label className="fullField"><span>Target audience and markets</span><input name="targetMarkets" maxLength={500} placeholder="Example: filmmakers in the US, UK, France and GCC" /></label>
          <label className="fullField"><span>Preferred timeline</span><input name="timeline" maxLength={300} placeholder="Launch date or ideal publishing window" /></label>
          <label className="fullField"><span>Tell us about the campaign *</span><textarea name="brief" required minLength={30} maxLength={5000} rows={8} placeholder="Describe the product, core message, audience action, required platforms, content references, usage rights or any mandatory requirements." /></label>
        </div>

        <label className="formConsent"><input type="checkbox" name="consent" required /><Check /><p>I confirm that the information is accurate and agree that Today Film Makers and JUST WHY US may store and use it to review and respond to this partnership inquiry. *</p></label>
        <button type="submit" disabled={submitState === 'sending' || submitState === 'success'}>{submitState === 'sending' ? 'Sending campaign brief…' : submitState === 'success' ? 'Campaign brief received' : 'Send campaign brief'} <Send size={17} /></button>

        <div className={`formStatus ${submitState}`} aria-live="polite" role={submitState === 'error' ? 'alert' : 'status'}>
          {submitState === 'success' ? <><strong>{statusMessage}</strong><span>Reference: {reference}</span><p>Save this reference. We will review the brief and reply to the submitted email, usually within 1–2 business days.</p></> : statusMessage ? <p>{statusMessage}</p> : null}
        </div>
      </motion.form>
    </section>

    <section className="contactFaq">
      <div className="faqIntro"><span className="eyebrow">QUICK ANSWERS</span><h2>Good questions.<i>Clear answers.</i></h2><p>Open any question to understand the process before you send the campaign brief.</p><div className="faqCounter" aria-hidden="true"><strong>0{openFaq + 1}</strong><span>ACTIVE ANSWER</span></div></div>
      <div className="faqList">{quickAnswers.map(([question, answer], index) => { const isOpen = openFaq === index; return <article className={isOpen ? 'faqItem open' : 'faqItem'} key={question}><button type="button" className="faqQuestion" onClick={() => setOpenFaq(index)} aria-expanded={isOpen}><span>0{index + 1}</span><h3>{question}</h3><i className="faqToggle">{isOpen ? <Minus size={17} /> : <Plus size={17} />}</i></button><AnimatePresence initial={false}>{isOpen && <motion.div className="faqAnswer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .4, ease: [.16, 1, .3, 1] }}><p>{answer}</p></motion.div>}</AnimatePresence></article>; })}</div>
    </section>

    <section className="contactBottomCta"><div><span className="eyebrow">ANOTHER WAY IN</span><h2>YOUR PRODUCT.<br />THE RIGHT CREATIVE AUDIENCE.</h2><a href="mailto:hello@todayfilmmakers.com">Email TFM directly <ArrowRight /></a></div></section>
  </main>;
}
