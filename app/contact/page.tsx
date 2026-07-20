'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock3, Mail, Send, ShieldCheck } from 'lucide-react';
import { FormEvent, useState } from 'react';

const collaborationOptions = ['Promotional video share', 'Custom content creation', 'Product integration', 'Long-term sponsorship', 'Not sure yet'];
const budgetOptions = ['Under $300', '$300–$600', '$600–$1,500', '$1,500+', 'Need a custom quote'];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company')}`,
      `Email: ${data.get('email')}`,
      `Website: ${data.get('website')}`,
      `Collaboration: ${data.get('collaboration')}`,
      `Budget: ${data.get('budget')}`,
      `Timeline: ${data.get('timeline')}`,
      '',
      'Campaign brief:',
      `${data.get('brief')}`,
    ];
    const subject = encodeURIComponent(`TFM campaign inquiry — ${data.get('company') || data.get('name')}`);
    const body = encodeURIComponent(lines.join('\n'));
    setSent(true);
    window.location.href = `mailto:hello@todayfilmmakers.com?subject=${subject}&body=${body}`;
  }

  return <main className="contactPage">
    <div className="grain" />
    <header className="contactNav"><a href="/"><Image src="/logo.svg" width={92} height={42} alt="Today Film Makers" /></a><a href="/"><ArrowLeft size={15} /> Back to media kit</a></header>

    <section className="contactHero"><motion.div initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [.16, 1, .3, 1] }}><span className="eyebrow">BRAND PARTNERSHIP INQUIRY</span><h1>LET&apos;S BUILD A CAMPAIGN<br />FILMMAKERS WILL <i>REMEMBER.</i></h1><p>Tell us what you&apos;re launching, who you want to reach and which collaboration format interests you. We&apos;ll review the brief and reply with the strongest next step.</p></motion.div></section>

    <section className="contactBody"><aside className="contactAside"><div className="contactAsideSticky"><span className="eyebrow">WHAT HAPPENS NEXT</span><h2>A clear brief creates a stronger campaign.</h2><div className="contactSteps"><div><span>01</span><p>We review your product, audience and campaign objective.</p></div><div><span>02</span><p>We recommend the right TFM content format and deliverables.</p></div><div><span>03</span><p>We confirm scope, timeline, payment and production requirements.</p></div></div><div className="contactInfoCards"><article><Clock3 /><div><strong>Response time</strong><span>Usually within 1–2 business days</span></div></article><article><Mail /><div><strong>Direct email</strong><a href="mailto:hello@todayfilmmakers.com">hello@todayfilmmakers.com</a></div></article><article><ShieldCheck /><div><strong>Brand-safe process</strong><span>Nothing is published without agreed approval.</span></div></article></div></div></aside>

      <motion.form className="campaignForm" onSubmit={submitBrief} initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .12, ease: [.16, 1, .3, 1] }}>
        <div className="formHeading"><span>CAMPAIGN BRIEF</span><strong>Fields marked * are required</strong></div>
        <div className="formGrid"><label><span>Your name *</span><input name="name" required placeholder="Full name" /></label><label><span>Company / brand *</span><input name="company" required placeholder="Brand name" /></label><label><span>Business email *</span><input type="email" name="email" required placeholder="you@company.com" /></label><label><span>Website or product link</span><input type="url" name="website" placeholder="https://" /></label><label><span>Collaboration format *</span><select name="collaboration" required defaultValue=""><option value="" disabled>Select a format</option>{collaborationOptions.map(option => <option key={option}>{option}</option>)}</select></label><label><span>Estimated budget *</span><select name="budget" required defaultValue=""><option value="" disabled>Select a range</option>{budgetOptions.map(option => <option key={option}>{option}</option>)}</select></label><label className="fullField"><span>Preferred timeline</span><input name="timeline" placeholder="Launch date or ideal publishing window" /></label><label className="fullField"><span>Tell us about the campaign *</span><textarea name="brief" required rows={8} placeholder="What is the product? What do you want the audience to understand or do? Which platforms and deliverables do you need?" /></label></div>
        <div className="formConsent"><Check /><p>By sending this brief, you confirm that the information is accurate and can be used to prepare a collaboration proposal.</p></div>
        <button type="submit">Send campaign brief <Send size={17} /></button>
        {sent && <p className="formStatus">Your email application should now open with the completed brief. Send that email to finish the inquiry.</p>}
      </motion.form>
    </section>

    <section className="contactFaq"><div><span className="eyebrow">QUICK ANSWERS</span><h2>Before you send the brief.</h2></div><div>{[['Do you require prepayment?', 'Yes. The payment structure is confirmed before production or campaign scheduling begins.'], ['Can brands provide their own video?', 'Yes. Promotional video share campaigns can use an approved brand-supplied asset when it fits the audience and platform requirements.'], ['Can you create custom content?', 'Yes. Custom content campaigns include concept development, production and editing based on the confirmed scope.'], ['Can we request long-term support?', 'Yes. Recurring campaigns and sponsorship structures are available through a custom partnership quote.']].map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>

    <section className="contactBottomCta"><Image src="/logo.svg" width={120} height={54} alt="Today Film Makers" /><h2>YOUR PRODUCT.<br />THE RIGHT CREATIVE AUDIENCE.</h2><a href="mailto:hello@todayfilmmakers.com">Email TFM directly <ArrowRight /></a></section>
  </main>;
}
