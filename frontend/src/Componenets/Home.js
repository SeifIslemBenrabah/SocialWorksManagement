import React, { useState, useEffect, useRef } from 'react';
import Logo from '../Assets/Logo.svg';
import Heropic from '../Assets/Heropic.png';
import esi from '../Assets/esi.svg';
import cnas from '../Assets/cnas.svg';
import aboutus from '../Assets/aboutus.png';
import Testimonial from '../Assets/Testimonial.png';

/* ─── scroll-triggered visibility hook ──────────────────────── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(entry.target); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ─── animated counter ──────────────────────────────────────── */
const Counter = ({ end, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let val = 0;
    const step = end / (1800 / 16);
    const t = setInterval(() => {
      val += step;
      if (val >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(val));
    }, 16);
    return () => clearInterval(t);
  }, [visible, end]);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="text-4xl font-bold text-pblue">{count}{suffix}</span>
      <span className="text-gray-500 text-sm font-medium text-center">{label}</span>
    </div>
  );
};

/* ─── FAQ accordion item ─────────────────────────────────────── */
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-4">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left font-semibold text-gray-800 hover:text-pblue transition-colors">
        <span>{q}</span>
        <svg className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 mt-3' : 'max-h-0'}`}>
        <p className="text-gray-500 leading-relaxed text-sm">{a}</p>
      </div>
    </div>
  );
};

/* ─── background patterns (inline styles) ───────────────────── */
const dots = {
  backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.13) 1.5px, transparent 1.5px)',
  backgroundSize: '22px 22px',
};
const diag = {
  backgroundImage: `repeating-linear-gradient(
    45deg, transparent, transparent 12px,
    rgba(59,130,246,0.05) 12px, rgba(59,130,246,0.05) 13px)`,
};

/* ═══════════════════════════════════════════════════════════════ */
const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const [heroRef, heroVis]           = useInView(0.05);
  const [aboutRef, aboutVis]         = useInView(0.1);
  const [servicesRef, servicesVis]   = useInView(0.05);
  const [howRef, howVis]             = useInView(0.05);
  const [testRef, testVis]           = useInView(0.1);
  const [contactRef, contactVis]     = useInView(0.05);

  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      title: 'Solfa Demand',
      desc: 'Request a salary advance from the committee. Submit your demand and track its progress until you receive a decision.',
      features: ['Monthly deduction plan', 'Fast approval process', 'Real-time status updates'],
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      title: 'Document Requests',
      desc: 'Submit requests for official documents and certificates directly through the platform. No more physical paperwork or queues.',
      features: ['Upload supporting files', 'Secure file storage', 'Digital delivery'],
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
      title: 'Committee Meetings',
      desc: 'Stay informed about upcoming committee meetings, access meeting minutes, and view decisions that affect your demands.',
      features: ['Meeting schedule', 'PV access', 'Decision transparency'],
    },
  ];

  const steps = [
    { num: '01', title: 'Get Your Account', desc: 'Receive your credentials from the admin and access the employee portal.' },
    { num: '02', title: 'Browse Programmes', desc: 'Explore available financial programmes and check eligibility conditions.' },
    { num: '03', title: 'Submit Your Demand', desc: 'Fill in the demand form and attach any required supporting documents.' },
    { num: '04', title: 'Get a Response', desc: 'The committee reviews your demand and sends a decision directly to you.' },
  ];

  const faqs = [
    { q: 'Who can use this platform?', a: 'This platform is exclusively for employees of ESI SBA. You need an account created by the admin to log in.' },
    { q: 'How long does it take to get a response?', a: 'The committee reviews demands during their scheduled meetings. Decisions are typically communicated within a few days.' },
    { q: 'What documents do I need to submit?', a: 'Required documents vary by programme. Each programme lists its conditions. Common documents include salary slips and national ID copies.' },
    { q: 'Can I track my demand status?', a: 'Yes. After submitting, you can log in at any time to view the real-time status: Waiting, Accepted, Complete, or Incomplete.' },
    { q: 'Is my personal data secure?', a: 'Yes. All data is stored securely and is only accessible by you and authorized committee members.' },
  ];

  return (
    <div className="font-poppins overflow-x-hidden">

      {/* ── ANIMATIONS ─────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-40px);} to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight{ from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes floatY   { 0%,100%{ transform:translateY(0);    } 50%{ transform:translateY(-18px); } }
        @keyframes blobMorph{ 0%,100%{ border-radius:60% 40% 30% 70%/60% 30% 70% 40%; } 50%{ border-radius:30% 60% 70% 40%/50% 60% 30% 60%; } }
        @keyframes spinRing { to { transform:rotate(360deg); } }
        @keyframes pulse2   { 0%,100%{ opacity:.6; transform:scale(1);    } 50%{ opacity:.9; transform:scale(1.05); } }
        @keyframes slideIn  { from { opacity:0; transform:translateX(-100%); } to { opacity:1; transform:translateX(0); } }

        .afu { animation: fadeUp    0.7s ease both; }
        .afl { animation: fadeLeft  0.7s ease both; }
        .afr { animation: fadeRight 0.7s ease both; }
        .afloat { animation: floatY   4s ease-in-out infinite; }
        .ablob  { animation: blobMorph 8s ease-in-out infinite; }
        .aring  { animation: spinRing  22s linear infinite; }
        .aring2 { animation: spinRing  16s linear infinite reverse; }
        .apulse { animation: pulse2    3s ease-in-out infinite; }

        .d1  { animation-delay: .1s; } .d2 { animation-delay: .2s; }
        .d3  { animation-delay: .3s; } .d4 { animation-delay: .4s; }
        .d5  { animation-delay: .5s; } .d6 { animation-delay: .6s; }
        .hidden-anim { opacity: 0; }

        .card-lift { transition: transform .3s ease, box-shadow .3s ease; }
        .card-lift:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,64,128,.12); }

        .btn-glow:hover { box-shadow: 0 0 24px rgba(59,130,246,.5); }

        .step-line::after {
          content:'';
          position:absolute;
          top:50%;
          left:calc(100% + 4px);
          width:calc(100% - 8px);
          height:2px;
          background: linear-gradient(90deg, #3b82f6, #dbeafe);
        }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className={`w-full flex flex-row bg-white fixed px-6 md:px-12 py-4 items-center justify-between z-50 transition-all duration-300 ${scrolled ? 'shadow-lg py-3' : 'shadow-sm'}`}>
        <img src={Logo} alt="logo" className="w-28" />
        <div className="hidden md:flex flex-row gap-8 text-sm">
          {['home', 'aboutus', 'services', 'howitworks', 'contactus'].map((id) => (
            <a key={id} href={`#${id}`} className="text-gray-600 hover:text-pblue transition-colors font-medium capitalize">
              {id === 'howitworks' ? 'How It Works' : id === 'contactus' ? 'Contact' : id === 'aboutus' ? 'About Us' : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
        <a href="/login" className="bg-pblue hover:bg-dblue transition-colors px-5 py-2 rounded-xl text-white font-semibold text-sm btn-glow">
          Login
        </a>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col-reverse md:flex-row items-end pt-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#004080 0%,#1a5fa8 55%,#3b82f6 100%)', ...dots }}
      >
        {/* decorative rings */}
        <div className="absolute top-16 right-8 w-72 h-72 rounded-full border border-white/10 aring pointer-events-none" />
        <div className="absolute top-28 right-20 w-44 h-44 rounded-full border border-white/15 aring2 pointer-events-none" />
        <div className="absolute bottom-32 left-8 w-56 h-56 rounded-full border border-white/8 pointer-events-none" />
        {/* glow blob */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pblue/20 rounded-full blur-3xl pointer-events-none apulse" />

        {/* image */}
        <div className={`md:w-1/2 flex justify-center px-6 md:px-10 z-0 self-end pb-10 ${heroVis ? 'afr' : 'hidden-anim'}`}>
          <img src={Heropic} alt="hero" className="w-full max-w-md drop-shadow-2xl mb-0" />
        </div>

        {/* text */}
        <div className={`md:w-1/2 px-8 md:px-16 text-dblue z-10 self-center pb-16 ${heroVis ? 'afl' : 'hidden-anim'}`}>
          <span className="inline-block bg-white/10 backdrop-blur-sm text-pblue text-xs font-semibold px-3 py-1 rounded-full mb-5 border border-white/20 tracking-wider uppercase">
            ESI SBA · Employee Portal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ lineHeight: '1.15' }}>
            Manage Your <span className="text-white bg-dblue px-3">Financial</span> Requests with Ease
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-tight max-w-md">
            Submit demands, track approvals, and stay connected with the committee — all in one place. No paperwork, no queues.
          </p>
          <div className="flex flex-row gap-4 flex-wrap">
            <a href="/login" className="bg-white text-pblue font-bold px-7 py-3 rounded-xl hover:bg-blue-50 hover:text-dblue transition-all shadow-lg btn-glow">
              Get Started
            </a>
            <a href="#howitworks" className="border-2 border-white/40 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/10 transition-all">
              How It Works
            </a>
          </div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 70L60 58C120 46 240 22 360 16C480 10 600 22 720 30C840 38 960 42 1080 38C1200 34 1320 18 1380 10L1440 2V70H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          <Counter end={500}  suffix="+" label="Registered Employees" />
          <Counter end={1200} suffix="+" label="Demands Processed" />
          <Counter end={98}   suffix="%" label="Satisfaction Rate" />
          <Counter end={48}   suffix="h" label="Avg. Response Time" />
        </div>
      </section>

      {/* ── PARTNERS ───────────────────────────────────────────── */}
      <section className="py-10 bg-blue-50 flex items-center justify-center gap-20">
        <img src={esi}  alt="ESI SBA" className="h-16 md:h-24 opacity-75 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0" />
        <div className="w-px h-16 md:h-24 bg-blue-200" />
        <img src={cnas} alt="CNAS"    className="h-16 md:h-24 opacity-75 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0" />
      </section>

      {/* ── ABOUT US ───────────────────────────────────────────── */}
      <section id="aboutus" className="relative py-24 overflow-hidden bg-white" style={diag}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-14 px-8">
          {/* image */}
          <div ref={aboutRef} className={`md:w-1/2 relative ${aboutVis ? 'afl' : 'hidden-anim'}`}>
            <div className="absolute -top-8 -left-8 w-52 h-52 bg-pblue/10 rounded-full ablob pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-dblue/10 rounded-full ablob d4 pointer-events-none" />
            <img src={aboutus} alt="About us" className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl mx-auto" />
          </div>
          {/* text */}
          <div className={`md:w-1/2 ${aboutVis ? 'afr d2' : 'hidden-anim'}`}>
            <span className="text-pblue font-semibold text-xs uppercase tracking-widest">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dblue mt-2 mb-6 leading-tight">
              Dedicated to ESI SBA<br />Employees
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              We built this platform to serve the unique needs of ESI SBA staff. Our goal is to make financial requests transparent, fast, and completely hassle-free — giving every employee a direct channel to the committee.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              From submitting a demand to receiving a final decision, the entire workflow lives here. No physical forms, no chasing approvals — just a clear, digital process you can monitor anytime.
            </p>
            <div className="flex flex-col gap-3">
              {['100% digital — no paperwork', 'Real-time status updates', 'Secure and private data'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-pblue flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section
        id="services"
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#EFF6FF 0%,#DBEAFE 100%)', ...dots }}
      >
        <div className="max-w-6xl mx-auto px-8">
          <div ref={servicesRef} className={`text-center mb-14 ${servicesVis ? 'afu' : 'hidden-anim'}`}>
            <span className="text-pblue font-semibold text-xs uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dblue mt-2">Our Services</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Everything you need to manage financial requests and stay connected with the committee.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-8 shadow-md card-lift border border-blue-50 ${servicesVis ? `afu d${i + 2}` : 'hidden-anim'}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-pblue mb-6 shadow-sm">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-dblue mb-3">{s.title}</h3>
                <p className="text-gray-500 mb-5 leading-relaxed text-sm">{s.desc}</p>
                <ul className="flex flex-col gap-2">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-pblue flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section id="howitworks" className="py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-8">
          <div ref={howRef} className={`text-center mb-16 ${howVis ? 'afu' : 'hidden-anim'}`}>
            <span className="text-pblue font-semibold text-xs uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dblue mt-2">How It Works</h2>
            <p className="text-gray-500 mt-3 text-sm">Four easy steps to get your demand processed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* connector */}
            <div className="hidden md:block absolute top-10 left-[13%] right-[13%] h-0.5 bg-gradient-to-r from-pblue via-blue-200 to-pblue" />
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${howVis ? `afu d${i + 1}` : 'hidden-anim'}`}>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pblue to-dblue flex items-center justify-center text-white text-2xl font-bold shadow-xl mb-5 relative z-10 ring-4 ring-blue-50">
                  {step.num}
                </div>
                <h3 className="font-bold text-dblue text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ────────────────────────────────────────── */}
      <section
        ref={testRef}
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#004080 0%,#1a5fa8 100%)', ...dots }}
      >
        {/* glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center gap-14">
          {/* quote */}
          <div className={`md:w-1/2 ${testVis ? 'afl' : 'hidden-anim'}`}>
            <span className="text-pblue font-semibold text-xs uppercase tracking-widest">Testimonial</span>
            <h2 className="text-3xl text-dblue font-bold mt-2 mb-8">What Our Employees Say</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 relative">
              <svg className="w-10 h-10 text-blue-200/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-600 text-lg leading-relaxed italic">
                "Thanks to this platform, I saved so much time managing my financial requests. I submitted my demand in minutes and received a response within two days. It's been an invaluable resource."
              </p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-pblue flex items-center justify-center text-white font-bold text-lg shadow-md">A</div>
                <div>
                  <p className="text-dblue font-semibold">Ahmed B.</p>
                  <p className="text-pblue text-sm">ESI SBA Employee</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* image */}
          <div className={`md:w-1/2 flex justify-center ${testVis ? 'afr d2' : 'hidden-anim'}`}>
            <img src={Testimonial} alt="testimonial" className="w-full max-w-sm rounded-3xl shadow-2xl afloat ring-4 ring-white/10" />
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-12">
            <span className="text-pblue font-semibold text-xs uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dblue mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-3 text-sm">Everything you need to know about the platform.</p>
          </div>
          <div className="border border-gray-100 rounded-3xl px-6 py-2 shadow-sm divide-y divide-gray-100">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────── */}
      <section
        id="contactus"
        ref={contactRef}
        className="py-24 relative overflow-hidden"
        style={{ background: '#EFF6FF', ...diag }}
      >
        <div className="max-w-5xl mx-auto px-8">
          <div className={`text-center mb-14 ${contactVis ? 'afu' : 'hidden-anim'}`}>
            <span className="text-pblue font-semibold text-xs uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dblue mt-2">Contact Us</h2>
            <p className="text-gray-500 mt-3 text-sm">Have a question? Reach out and we'll get back to you.</p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${contactVis ? 'afu d2' : 'hidden-anim'}`}>
            {/* info cards */}
            <div className="flex flex-col gap-5">
              {[
                {
                  label: 'Phone', value: '(+213) 000 000 0000',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                },
                {
                  label: 'Email', value: 'contact@esi-sba.dz',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                },
                {
                  label: 'Address', value: 'ESI SBA, Sidi Bel Abbès, Algeria',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                },
                {
                  label: 'Working Hours', value: 'Sun – Thu, 08:00 – 16:30',
                  icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm card-lift">
                  <div className="w-11 h-11 rounded-xl bg-pblue/10 flex items-center justify-center text-pblue flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-bold text-dblue text-sm">{item.label}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* form */}
            <form className="bg-white rounded-3xl p-8 shadow-md flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-bold text-dblue text-lg mb-1">Send a Message</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30 focus:border-pblue transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30 focus:border-pblue transition"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30 focus:border-pblue transition"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pblue/30 focus:border-pblue transition resize-none"
              />
              <button
                type="submit"
                className="bg-pblue hover:bg-dblue text-white font-bold py-3 rounded-xl transition-all shadow-md btn-glow"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-dblue text-white" style={dots}>
        <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={Logo} alt="logo" className="w-24 brightness-0 invert opacity-90" />
          <div className="flex flex-row gap-6 text-blue-200 text-sm">
            {['#home', '#aboutus', '#services', '#howitworks', '#contactus'].map((href, i) => {
              const labels = ['Home', 'About', 'Services', 'How It Works', 'Contact'];
              return (
                <a key={i} href={href} className="hover:text-white transition-colors">{labels[i]}</a>
              );
            })}
            <a href="/login" className="hover:text-white transition-colors">Login</a>
          </div>
          <p className="text-blue-300 text-xs">© {new Date().getFullYear()} ESI SBA. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
