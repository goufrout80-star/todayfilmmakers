'use client';

import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, BarChart3, Check, Film, Globe2, Instagram, Layers3, Menu, MousePointer2, Sparkles, Users, X } from 'lucide-react';
import { MouseEvent, useState } from 'react';

const metrics=[['332K+','Instagram followers'],['198K+','Facebook followers'],['12M+','Monthly views'],['8.4%','Engagement rate'],['190+','Countries reached'],['83%','Audience aged 18–34']];
const formats=[
  ['01','Promotional video share','Brand-supplied or approved creative distributed across the Today Film Makers network.'],
  ['02','Custom content creation','A dedicated short-form concept produced around your product, workflow or campaign objective.'],
  ['03','Integrated feature','Natural product placement inside educational or inspiration-led filmmaking content.'],
  ['04','Long-term partnership','Recurring visibility, campaign planning and content support across multiple launches.']
];
const packages=[
  {name:'Promotional Video Share',price:'Starting at $300',featured:false,items:['Cross-platform distribution','Caption adapted for our audience','Brand tag and campaign CTA','Performance summary after publishing']},
  {name:'Custom Content Creation',price:'Starting at $600',featured:true,items:['Custom concept and creative direction','Production and editing included','Revision round before publishing','Cross-platform campaign support','Performance reporting']},
  {name:'Custom Partnership',price:'Campaign quote',featured:false,items:['Multi-video campaign planning','Long-term brand integration','Priority production scheduling','Custom deliverables and usage terms']}
];
const reveal={hidden:{opacity:0,y:48},show:{opacity:1,y:0,transition:{duration:.85,ease:[.16,1,.3,1]}}};

function MagneticLink({children,href,className=''}:{children:React.ReactNode;href:string;className?:string}){
  const x=useMotionValue(0),y=useMotionValue(0);const sx=useSpring(x,{stiffness:190,damping:16}),sy=useSpring(y,{stiffness:190,damping:16});
  const move=(e:MouseEvent<HTMLAnchorElement>)=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.16);y.set((e.clientY-r.top-r.height/2)*.16)};
  return <motion.a href={href} className={className} style={{x:sx,y:sy}} onMouseMove={move} onMouseLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.a>
}

export default function Home(){
  const [open,setOpen]=useState(false);const mouseX=useMotionValue(50),mouseY=useMotionValue(50);const {scrollYProgress}=useScroll();
  const glow=useMotionTemplate`radial-gradient(620px circle at ${mouseX}% ${mouseY}%, rgba(244,201,0,.16), transparent 62%)`;
  return <main onMouseMove={e=>{mouseX.set((e.clientX/window.innerWidth)*100);mouseY.set((e.clientY/window.innerHeight)*100)}}>
    <div className="grain"/><motion.div className="ambientGlow" style={{background:glow}}/><motion.div className="progress" style={{scaleX:scrollYProgress}}/>
    <header className="nav"><a href="#top" className="brand"><Image src="/logo.svg" alt="Today Film Makers" width={92} height={42}/></a><nav>{['Audience','Formats','Performance','Packages'].map(x=><a href={'#'+x.toLowerCase()} key={x}>{x}</a>)}</nav><MagneticLink className="navCta" href="/contact">Start a campaign <ArrowUpRight size={15}/></MagneticLink><button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>
    {open&&<div className="mobileNav">{['Audience','Formats','Performance','Packages'].map(x=><a key={x} href={'#'+x.toLowerCase()} onClick={()=>setOpen(false)}>{x}<ArrowUpRight/></a>)}<a href="/contact">Contact <ArrowUpRight/></a></div>}

    <section className="dealHero" id="top">
      <div className="heroGrid"/>
      <motion.div className="dealHeroCopy" initial="hidden" animate="show" variants={reveal}><span className="eyebrow">TODAY FILM MAKERS — BRAND PARTNERSHIPS</span><h1>WHERE FILMMAKING BRANDS MEET A <i>GLOBAL CREATIVE AUDIENCE.</i></h1><p>We help filmmaking, camera, editing, software and AI brands reach an engaged community through credible short-form campaigns built for attention and trust.</p><div className="heroActions"><MagneticLink href="/contact" className="primaryBtn">Partner with us <ArrowUpRight/></MagneticLink><a className="ghostBtn" href="#audience">View media kit</a></div></motion.div>
      <motion.div className="heroDevice" initial={{opacity:0,x:70,rotate:4}} animate={{opacity:1,x:0,rotate:0}} transition={{duration:1.1,delay:.2,ease:[.16,1,.3,1]}}><div className="deviceTop"><span>TFM CAMPAIGN</span><span>● LIVE</span></div><Image fill src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=90" alt="Filmmaking campaign preview"/><div className="floatingTag one">12M+ monthly views</div><div className="floatingTag two">332K+ Instagram</div><div className="floatingTag three">Brand-ready content</div></motion.div>
      <div className="brandTicker"><span>CAMERA</span><span>EDITING</span><span>AI TOOLS</span><span>FILMMAKING</span><span>SOFTWARE</span><span>GEAR</span><span>CREATIVE TECH</span></div>
    </section>

    <section className="mediaSection" id="audience"><div className="sectionIntro"><span className="eyebrow">01 — THE AUDIENCE</span><h2>A CREATIVE COMMUNITY BUILT FOR <i>RELEVANT BRANDS.</i></h2><p>Temporary presentation data is shown below and will be replaced with your verified social analytics.</p></div><div className="metricGrid">{metrics.map(([v,l])=><motion.div key={l} initial="hidden" whileInView="show" viewport={{once:true}} variants={reveal}><strong>{v}</strong><span>{l}</span><small>Placeholder data</small></motion.div>)}</div><div className="insightGrid"><div><h3>Audience breakdown</h3><div className="bars"><span><b>18–24</b><i style={{width:'78%'}}/></span><span><b>25–34</b><i style={{width:'88%'}}/></span><span><b>35–44</b><i style={{width:'38%'}}/></span></div></div><div><h3>Top audience interests</h3><div className="interestTags"><span>Filmmaking</span><span>Editing</span><span>Cameras</span><span>Color grading</span><span>AI tools</span><span>Creative software</span></div></div></div></section>

    <section className="formatsSection" id="formats"><div className="sectionIntro"><span className="eyebrow">02 — CONTENT FORMATS</span><h2>FOUR WAYS TO PUT YOUR BRAND <i>IN FRONT OF FILMMAKERS.</i></h2></div><div className="formatCards">{formats.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight/></article>)}</div></section>

    <section className="performance" id="performance"><div className="performanceVisual"><Image fill src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=90" alt="Campaign case study"/><span className="caseLabel">SAMPLE CAMPAIGN</span></div><div className="performanceCopy"><span className="eyebrow">03 — CAMPAIGN PERFORMANCE</span><h2>BUILT TO BE SEEN, <i>UNDERSTOOD AND REMEMBERED.</i></h2><p>Campaign content is structured around clear product value, strong visual hooks and native storytelling for filmmakers.</p><div className="caseStats"><div><strong>1.35M+</strong><span>Views</span></div><div><strong>95K</strong><span>Reach</span></div><div><strong>47K</strong><span>Interactions</span></div><div><strong>8.6K</strong><span>Saves</span></div></div><small>Sample values until verified campaign results are supplied.</small></div></section>

    <section className="whyBrands"><div className="sectionIntro centered"><span className="eyebrow">WHY BRANDS CHOOSE TFM</span><h2>WE MAKE CREATIVE PRODUCTS FEEL <i>VALUABLE.</i></h2></div><div className="reasonGrid"><div><Sparkles/><h3>Audience fit first</h3><p>We only position products that genuinely make sense for filmmakers and creative professionals.</p></div><div><Film/><h3>Native storytelling</h3><p>Campaigns are shaped like content people choose to watch—not ads they try to skip.</p></div><div><BarChart3/><h3>Clear reporting</h3><p>Brands receive measurable performance data covering views, reach and engagement.</p></div></div></section>

    <section className="packages" id="packages"><div className="sectionIntro centered"><span className="eyebrow">04 — COLLABORATION OPTIONS</span><h2>CHOOSE THE FORMAT THAT FITS <i>YOUR CAMPAIGN.</i></h2></div><div className="packageGrid">{packages.map(p=><article className={p.featured?'featured':''} key={p.name}>{p.featured&&<span className="popular">MOST POPULAR</span>}<h3>{p.name}</h3><strong>{p.price}</strong><ul>{p.items.map(x=><li key={x}><Check/>{x}</li>)}</ul><a href="/contact">Start a campaign <ArrowUpRight/></a></article>)}</div></section>

    <section className="finalDealCta"><span className="eyebrow">LET&apos;S BUILD THE RIGHT CAMPAIGN</span><h2>TELL US ABOUT<br/>YOUR PRODUCT.</h2><p>Share your goals, timing and preferred campaign format. We&apos;ll respond with the best way to work together.</p><MagneticLink href="/contact" className="ctaCircle">CONTACT TFM <ArrowUpRight/></MagneticLink></section>
    <footer><div><Image src="/logo.svg" alt="Today Film Makers" width={110} height={50}/><span>Brand partnerships for the filmmaking industry.</span></div><div><span>© 2026 TODAY FILM MAKERS</span><a href="/contact">CONTACT</a><a href="#top">BACK TO TOP ↑</a></div></footer>
  </main>
}