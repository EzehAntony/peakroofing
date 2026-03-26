"use client";
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Services", "Process", "Projects", "About", "Contact"];

const SERVICES = [
  { icon: "▲", title: "Full Roof Replacement", desc: "Complete tear-off and replacement with premium materials. Built for Canadian winters." },
  { icon: "◆", title: "Roof Repair", desc: "Leaks, missing shingles, storm damage — fixed fast. Same-week appointments available." },
  { icon: "●", title: "Ice Dam Removal", desc: "Safe, damage-free ice dam removal before it costs you thousands in water damage." },
  { icon: "■", title: "Roof Inspection", desc: "Detailed written inspection report. Essential before buying or selling a home." },
];

const PROJECTS = [
  { num: "001", location: "Mississauga, ON", type: "Full Replacement", material: "Asphalt Shingle", year: "2024" },
  { num: "002", location: "Brampton, ON", type: "Storm Damage Repair", material: "Metal Roofing", year: "2024" },
  { num: "003", location: "Hamilton, ON", type: "Full Replacement", material: "Architectural Shingle", year: "2023" },
  { num: "004", location: "Oakville, ON", type: "Flat Roof Install", material: "TPO Membrane", year: "2023" },
];

const STATS = [
  { value: 14, suffix: "+", label: "Years in Business" },
  { value: 900, suffix: "+", label: "Roofs Completed" },
  { value: 5, suffix: "M", label: "Liability Coverage" },
  { value: 5, suffix: "★", label: "Google Rating" },
];

const PROCESS = [
  { step: "01", title: "Free Assessment", desc: "We come to you, inspect the roof, and give you a straight quote. No upselling." },
  { step: "02", title: "Material Selection", desc: "We walk you through your options — shingle, metal, membrane — with honest pros and cons." },
  { step: "03", title: "Scheduled Install", desc: "Our in-house crew shows up on time. Most jobs completed within 1–2 days." },
  { step: "04", title: "Final Walkthrough", desc: "We inspect the finished job with you before we leave. You sign off, we clean up." },
];

const TICKER_ITEMS = ["Licensed & Insured", "14 Years Experience", "900+ Roofs", "5★ Google Rating", "GTA & Ontario", "No Subcontractors", "10-Year Warranty"];

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1600, visible);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 600, marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function PeakRoofing() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("services");
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(n => n.toLowerCase());
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "#0A0A0A", color: "#F5F0E8", minHeight: "100vh", overflowX: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a, button { cursor: none !important; }
        .nav-link { color: #F5F0E8; text-decoration: none; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; opacity: 0.4; transition: opacity 0.2s; position: relative; }
        .nav-link:hover, .nav-link.active { opacity: 1; }
        .nav-link.active::after { content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 1px; background: #E8380D; }
        .btn-primary { background: #E8380D; color: #fff; border: none; padding: 14px 32px; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: none; transition: background 0.2s, transform 0.15s; }
        .btn-primary:hover { background: #FF4A1C; transform: translateY(-2px); }
        .btn-outline { background: transparent; color: #F5F0E8; border: 1px solid rgba(245,240,232,0.25); padding: 13px 32px; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: none; transition: all 0.2s; }
        .btn-outline:hover { border-color: #F5F0E8; }
        .service-card { background: #0E0E0E; border: 0.5px solid #1E1E1E; padding: 36px 32px; transition: border-color 0.3s, background 0.3s; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #E8380D; transform: scaleX(0); transform-origin: left; transition: transform 0.35s; }
        .service-card:hover::before { transform: scaleX(1); }
        .service-card:hover { background: #111; }
        .project-row { border-bottom: 0.5px solid #141414; padding: 22px 0; display: grid; grid-template-columns: 52px 1fr 1fr 1fr 60px; gap: 16px; align-items: center; transition: padding-left 0.2s; }
        .project-row:hover { padding-left: 14px; }
        .process-card { padding: 40px 32px; background: #0A0A0A; border-top: 2px solid #E8380D; transition: background 0.2s; }
        .process-card:hover { background: #0D0D0D; }
        input, textarea { background: #0E0E0E; border: 0.5px solid #1E1E1E; color: #F5F0E8; padding: 16px; font-family: 'Barlow', sans-serif; font-size: 15px; width: 100%; outline: none; transition: border-color 0.2s; }
        input:focus, textarea:focus { border-color: #E8380D; }
        input::placeholder, textarea::placeholder { color: #333; font-size: 14px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes grain { 0%,100% { transform: translate(0,0); } 20% { transform: translate(-1%,-1%); } 40% { transform: translate(1%,1%); } 60% { transform: translate(-1%,1%); } 80% { transform: translate(1%,-1%); } }
        .hero-line { opacity: 0; transform: translateY(44px); transition: none; }
        .hero-line.on { animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-line.on:nth-child(1) { animation-delay: 0.08s; }
        .hero-line.on:nth-child(2) { animation-delay: 0.22s; }
        .hero-line.on:nth-child(3) { animation-delay: 0.36s; }
        .fadein { opacity: 0; animation: fadeUp 0.8s 0.52s ease both; }
        .ticker-wrap { overflow: hidden; }
        .ticker-track { display: flex; width: max-content; animation: ticker 30s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
        .grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 180px; animation: grain 0.35s steps(1) infinite; }
        @media (max-width: 768px) {
          .hide-mob { display: none !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .svc-grid { grid-template-columns: 1fr !important; }
          .proc-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .proj-row { grid-template-columns: 40px 1fr 1fr 56px !important; }
          section, nav, footer { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>

      {/* GRAIN */}
      <div className="grain" />

      {/* CUSTOM CURSOR */}
      <div style={{ position: "fixed", zIndex: 9998, pointerEvents: "none", left: cursorPos.x, top: cursorPos.y, transform: "translate(-50%,-50%)" }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <line x1="15" y1="0" x2="15" y2="30" stroke="#E8380D" strokeWidth="0.8" />
          <line x1="0" y1="15" x2="30" y2="15" stroke="#E8380D" strokeWidth="0.8" />
          <circle cx="15" cy="15" r="3.5" fill="none" stroke="#E8380D" strokeWidth="0.8" />
        </svg>
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 52px", backdropFilter: "blur(14px)", background: "rgba(10,10,10,0.88)", borderBottom: "0.5px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M10 0L20 16H0L10 0Z" fill="#E8380D" /></svg>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase" }}>Peak Roofing</span>
        </div>
        <div className="hide-mob" style={{ display: "flex", gap: 40 }}>
          {NAV_LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link${activeSection === l.toLowerCase() ? " active" : ""}`}>{l}</a>)}
        </div>
        <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 12 }} onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
          Free Quote
        </button>
      </nav>

      {/* HERO */}
      <section style={{ background: "#0A0A0A", paddingTop: 172, paddingBottom: 130, paddingLeft: 52, paddingRight: 52, position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 72% 50%, rgba(232,56,13,0.07) 0%, transparent 55%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "35%", borderLeft: "0.5px solid #161616", pointerEvents: "none" }} />
        <div className="hide-mob" style={{ position: "absolute", bottom: "18%", right: 52, fontFamily: "'Barlow Condensed'", fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", color: "#232323", writingMode: "vertical-rl" }}>Toronto · Ontario · Canada</div>

        <div style={{ maxWidth: 980, position: "relative", zIndex: 2 }}>
          <div className="fadein" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
            <div style={{ width: 28, height: 0.5, background: "#E8380D" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E8380D", fontWeight: 700 }}>Toronto & Greater Ontario Area</span>
          </div>
          <h1 style={{ fontSize: "clamp(68px, 10vw, 120px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: 42 }}>
            {["Built Tough.", "Built Right.", "Built to Last."].map((line, i) => (
              <div key={i} className={`hero-line${heroVisible ? " on" : ""}`} style={{ display: "block" }}>
                {i === 1 ? <span style={{ WebkitTextStroke: "1.5px #F5F0E8", color: "transparent" }}>{line}</span> : line}
              </div>
            ))}
          </h1>
          <p className="fadein" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "#5A5A5A", maxWidth: 460, lineHeight: 1.8, marginBottom: 46 }}>
            Ontario's trusted roofing contractor. We replace, repair, and protect roofs built to handle everything Canada throws at them.
          </p>
          <div className="fadein" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Get a Free Quote →</button>
            <button className="btn-outline" onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}>See Our Work</button>
          </div>
        </div>
        <div style={{ position: "absolute", right: 64, top: "50%", transform: "translateY(-50%)", fontSize: "clamp(110px, 19vw, 250px)", fontWeight: 800, color: "#fff", opacity: 0.022, lineHeight: 1, userSelect: "none", letterSpacing: "-0.04em", pointerEvents: "none" }}>14<br />YRS</div>
      </section>

      {/* TICKER */}
      <div style={{ background: "#E8380D", padding: "13px 0", overflow: "hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Barlow Condensed'", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: i % 2 === 0 ? "#fff" : "rgba(255,255,255,0.55)", padding: "0 36px", whiteSpace: "nowrap" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: "#0D0D0D", padding: "68px 52px", borderBottom: "0.5px solid #141414" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, maxWidth: 860, margin: "0 auto" }}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" style={{ padding: "110px 52px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 24, height: 0.5, background: "#E8380D" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E8380D", fontWeight: 700 }}>What We Do</span>
              </div>
              <h2 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.9 }}>
                Our<br /><span style={{ WebkitTextStroke: "1px #F5F0E8", color: "transparent" }}>Services</span>
              </h2>
            </div>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "#4A4A4A", maxWidth: 300, lineHeight: 1.75 }}>Every job handled in-house. No subcontracting, no middlemen, no shortcuts.</p>
          </div>
          <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "#141414" }}>
            {SERVICES.map(s => (
              <div key={s.title} className="service-card">
                <div style={{ fontSize: 13, color: "#E8380D", fontWeight: 700, marginBottom: 28, letterSpacing: "0.06em" }}>{s.icon}</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "#5A5A5A", lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "110px 52px", background: "#070707" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 24, height: 0.5, background: "#E8380D" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E8380D", fontWeight: 700 }}>How It Works</span>
          </div>
          <h2 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 64 }}>
            The<br /><span style={{ WebkitTextStroke: "1px #F5F0E8", color: "transparent" }}>Process</span>
          </h2>
          <div className="proc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "#141414" }}>
            {PROCESS.map(p => (
              <div key={p.step} className="process-card">
                <div style={{ fontSize: 11, letterSpacing: "0.22em", color: "#E8380D", fontWeight: 700, marginBottom: 32 }}>{p.step}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", marginBottom: 14, lineHeight: 1.1 }}>{p.title}</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#4A4A4A", lineHeight: 1.8 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "110px 52px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 24, height: 0.5, background: "#E8380D" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E8380D", fontWeight: 700 }}>Recent Work</span>
          </div>
          <h2 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 64 }}>
            Completed<br /><span style={{ WebkitTextStroke: "1px #F5F0E8", color: "transparent" }}>Projects</span>
          </h2>
          <div style={{ borderTop: "0.5px solid #141414" }}>
            <div className="project-row proj-row" style={{ paddingBottom: 10 }}>
              {["#", "Location", "Type", "Material", "Year"].map((h, i) => (
                <div key={h} className={i === 3 ? "hide-mob" : ""} style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#2A2A2A", fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {PROJECTS.map(p => (
              <div key={p.num} className="project-row proj-row">
                <div style={{ fontSize: 11, color: "#E8380D", fontWeight: 700, letterSpacing: "0.1em" }}>{p.num}</div>
                <div style={{ fontSize: 17, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>{p.location}</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#666" }}>{p.type}</div>
                <div className="hide-mob" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#3A3A3A" }}>{p.material}</div>
                <div style={{ fontSize: 12, color: "#E8380D", fontWeight: 700, letterSpacing: "0.08em" }}>{p.year}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#141414" }}>
            {[
              { quote: "Peak replaced our entire roof in two days. Professional crew, fair price, cleaned up perfectly. Would recommend without hesitation.", name: "Karen D.", city: "Mississauga, ON", init: "K" },
              { quote: "Had three quotes. Peak was the only crew that actually explained what needed doing and why. Work was flawless. Couldn't ask for better.", name: "Marcus T.", city: "Brampton, ON", init: "M" },
            ].map(r => (
              <div key={r.name} style={{ padding: "44px 40px", background: "#0A0A0A" }}>
                <div style={{ fontSize: 56, color: "#E8380D", fontWeight: 800, lineHeight: 0.8, marginBottom: 20, fontFamily: "'Barlow Condensed'" }}>"</div>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#888", lineHeight: 1.8, fontStyle: "italic", marginBottom: 28 }}>{r.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1A1A1A", border: "0.5px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#E8380D" }}>{r.init}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{r.name}</div>
                    <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#444" }}>{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "110px 52px", background: "#070707" }}>
        <div className="about-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 0.5, background: "#E8380D" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E8380D", fontWeight: 700 }}>About Peak</span>
            </div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 32 }}>Ontario Owned.<br />Ontario Proud.</h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#555", lineHeight: 1.88, marginBottom: 20 }}>
              Peak Roofing has been protecting Ontario homes since 2010. Every job is handled by our in-house crew — no subcontracting, no shortcuts.
            </p>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#555", lineHeight: 1.88, marginBottom: 44 }}>
              We're fully licensed under the Ontario College of Trades and carry $5M liability insurance on every project.
            </p>
            <button className="btn-primary" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Work With Us →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#141414" }}>
            {[["Licensed", "Ontario College of Trades"], ["Insured", "$5M Liability Coverage"], ["Warranty", "10-Year Labour Warranty"], ["Local", "GTA & Surrounding Areas"]].map(([t, d]) => (
              <div key={t} style={{ background: "#0A0A0A", padding: "32px 28px", borderTop: "2px solid #E8380D" }}>
                <div style={{ fontSize: 17, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>{t}</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "#4A4A4A", lineHeight: 1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "110px 52px", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 24, height: 0.5, background: "#E8380D" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#E8380D", fontWeight: 700 }}>Get in Touch</span>
          </div>
          <h2 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 0.9, marginBottom: 18 }}>
            Free Roof<br /><span style={{ WebkitTextStroke: "1px #F5F0E8", color: "transparent" }}>Quote</span>
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#3A3A3A", marginBottom: 52 }}>No obligation. We assess your roof and give you a straight answer — usually within 24 hours.</p>

          {submitted ? (
            <div style={{ padding: "52px 40px", background: "#0E0E0E", borderTop: "2px solid #E8380D" }}>
              <div style={{ fontSize: 36, fontWeight: 800, textTransform: "uppercase", marginBottom: 10 }}>We'll Be In Touch.</div>
              <p style={{ fontFamily: "'Barlow', sans-serif", color: "#555" }}>Thanks for reaching out. Expect a call within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 1, background: "#141414" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                <input placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
              </div>
              <input placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              <textarea placeholder="Describe the work needed — repair, full replacement, inspection..." rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "none" }} />
              <button type="submit" className="btn-primary" style={{ width: "100%", padding: "20px", fontSize: 15, letterSpacing: "0.15em" }}>
                Request My Free Quote →
              </button>
            </form>
          )}

          <div style={{ marginTop: 56, paddingTop: 40, borderTop: "0.5px solid #141414", display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[["416-555-0193", "Call anytime"], ["info@peakroofing.ca", "Email us"], ["GTA & Ontario", "Service area"]].map(([main, sub]) => (
              <div key={main}>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.04em", marginBottom: 5 }}>{main}</div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#3A3A3A", letterSpacing: "0.1em", textTransform: "uppercase" }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", padding: "28px 52px", borderTop: "0.5px solid #0E0E0E", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="14" height="12" viewBox="0 0 20 16" fill="none"><path d="M10 0L20 16H0L10 0Z" fill="#E8380D" /></svg>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>Peak Roofing</span>
        </div>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#232323", letterSpacing: "0.06em" }}>© 2025 Peak Roofing Ontario. All rights reserved.</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "#2A2A2A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Site by</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#E8380D", letterSpacing: "0.1em", textTransform: "uppercase" }}>Nazville</span>
        </div>
      </footer>
    </div>
  );
}