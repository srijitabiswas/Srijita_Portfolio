import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  { label: "Languages",         color: "#fbbf24", items: ["C","C++","Java","Python","JavaScript"] },
  { label: "Web Development",   color: "#60a5fa", items: ["React","Vite","Node.js","Express.js","Tailwind CSS","Socket.io"] },
  { label: "Databases",         color: "#34d399", items: ["MongoDB","MySQL"] },
  { label: "AI & Machine Learning", color: "#f472b6", items: ["Scikit-learn","Streamlit","Recommendation Systems","Computer Vision","Generative AI"] },
  { label: "Tools & Design",    color: "#a78bfa", items: ["Git","GitHub","VS Code","Figma","Canva"] },
];

const CERTS = [
  { name: "National Cloud Innovation Challenge – National Finalist (Top 150)", org: "Unstop · 2026",            href: "https://unstop.com/certificate-preview/1027380c-2f68-477b-8d50-6bad3c6826d1" },
  { name: "Google UX Design",                                                  org: "Google · 2026",            href: "https://www.coursera.org/account/accomplishments/specialization/MNZG5823BEWA" },
  { name: "Digital Transformation & Product Design",                           org: "Employability.life · 2026",href: "https://verify.employability.life/verify?data=U2FsdGVkX1%2B1qEqkuZHLmCW%2BsC84ygmTb5Qw8nEi3UydXmE5iF7B81T%2F7p5lwzczV4OHx3DfcS90ZCe0qaW%2F2DwvFzZVCndWwMKAwm28gGc%3D" },
  { name: "Design Thinking for Innovation",                                    org: "Univ. of Virginia · 2025", href: "https://www.coursera.org/account/accomplishments/specialization/L0FBDJ3HWC16" },
  { name: "Introduction to Artificial Intelligence (AI)",                      org: "Coursera · 2025",          href: "https://www.coursera.org/account/accomplishments/verify/2I7B575SEINP" },
  { name: "Introduction to Generative AI",                                     org: "Google Cloud · 2025",      href: "https://www.coursera.org/account/accomplishments/specialization/RA7BCCALZL72" },
  { name: "Generative AI: Introduction and Applications",                      org: "IBM · 2025",               href: "https://www.coursera.org/account/accomplishments/verify/QBB3SXADCZWO" },
  { name: "Machine Learning and NLP Basics",                                   org: "Coursera · 2025",          href: "https://www.coursera.org/account/accomplishments/verify/IO8DPNDQYXBN" },
  { name: "Algorithms for Searching, Sorting, and Indexing",                   org: "Coursera · 2025",          href: "https://www.coursera.org/account/accomplishments/verify/VP08S60S8XLL" },
  { name: "Python for Data Science, AI & Development",                         org: "IBM · 2025",               href: "https://www.coursera.org/account/accomplishments/verify/5G38LS2269UX" },
  { name: "Trees and Graphs: Basics",                                          org: "Coursera · 2025",          href: "https://www.coursera.org/account/accomplishments/verify/QQJHN29OXZY5" },
];

const HACKATHONS = [
  {
    name: "AI Startup Buildathon 2026 – Beauty Salon Marketplace Challenge", date: "2026",
    badge: "48-Hour Buildathon",
    bullets: ["Built Glow-AI, an AI-powered beauty and salon marketplace, from scratch in 48 hours.", "Led UI/UX design and frontend development for the AI face-scan and salon-discovery experience."],
  },
  {
    name: "Bharat Academix CodeQuest", date: "2026",
    bullets: ["Competed in a national-level coding and product-building challenge focused on solving real-world problems through technology."],
  },
  {
    name: "Cloud Innovation Challenge", date: "Mar 2026 – Apr 2026",
    badge: "🏆 Top 150 of 1.4K+ participants",
    bullets: ["Led product design, user flow planning, and prototype development.", "Built an AI-powered solution addressing the challenge brief end-to-end."],
  },
  {
    name: "Status Code 2.0", date: "Aug 2025",
    bullets: ["Collaborated on problem-solving, full-stack development, and rapid prototyping within a team."],
  },
  {
    name: "Smart India Hackathon", date: "2024",
    bullets: ["Participated in a national-level innovation challenge focused on real-world technology solutions."],
  },
  {
    name: "Girls Hackathon", date: "2024",
    bullets: ["Contributed to innovation and cross-functional collaboration in a technology-focused environment."],
  },
];

const LANGS = [
  { name: "English", level: "Proficient",    filled: 5 },
  { name: "Bengali", level: "Mother Tongue", filled: 5 },
  { name: "Hindi",   level: "Intermediate",  filled: 4 },
  { name: "French",  level: "Basics",        filled: 2 },
];

const EXPLORING = [
  "Artificial Intelligence & Machine Learning","Full-Stack MERN Development",
  "Product Design & UX","Recommendation Systems",
  "Intelligent Decision Support Platforms","Scalable Web Applications",
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.from(".sk-group", {
          y: 40, opacity: 0, stagger: 0.07, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: ".sk-groups", start: "top 88%", once: true },
        });
        gsap.from(".sk-hack", {
          y: 24, opacity: 0, stagger: 0.1, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: ".sk-hacks", start: "top 88%", once: true },
        });
        gsap.from(".sk-cert-item", {
          y: 16, opacity: 0, stagger: 0.04, duration: 0.55, ease: "expo.out",
          scrollTrigger: { trigger: ".sk-certs-list", start: "top 90%", once: true },
        });
        gsap.from(".sk-edu-card", {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "expo.out",
          scrollTrigger: { trigger: ".sk-edu-grid", start: "top 88%", once: true },
        });
        gsap.from(".sk-lang-row", {
          y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "expo.out",
          scrollTrigger: { trigger: ".sk-langs", start: "top 88%", once: true },
        });
      }, ref);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} className="sk" id="skills">
      <div className="sk-wrap s-wrap">

        {/* ══ WHAT I BRING TO THE TABLE ══ */}
        <div className="sk-hero-heading">
          <h2 className="sk-main-title">
            WHAT I BRING<br />
            <span className="sk-title-accent">TO THE TABLE</span>
          </h2>
        </div>

        {/* Skill Groups */}
        <div className="sk-groups">
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className="sk-group">
              <div className="sk-group-head">
                <span className="sk-group-dot" style={{ background: g.color }} />
                <span className="sk-group-label" style={{ color: g.color }}>{g.label}</span>
              </div>
              <div className="sk-pills">
                {g.items.map((item) => (
                  <span key={item} className="sk-pill" style={{ "--pc": g.color } as React.CSSProperties}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Faint divider after skill cards — before Hackathons */}
        <div className="sk-section-divider" />

        {/* ══ HACKATHONS & COMPETITIONS ══ */}
        <div className="sk-block">
          <h3 className="sk-block-title">HACKATHONS<br /><span className="sk-title-accent">&amp; COMPETITIONS</span></h3>
          <div className="sk-hacks">
            {HACKATHONS.map((h) => (
              <div key={h.name} className="sk-hack">
                <div className="sk-hack-top">
                  <div>
                    <p className="sk-hack-name">{h.name}</p>
                    {h.badge && <span className="sk-hack-badge">{h.badge}</span>}
                  </div>
                  <span className="sk-hack-date">{h.date}</span>
                </div>
                <ul className="sk-hack-bullets">
                  {h.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CERTIFICATIONS ══ */}
        <div className="sk-block">
          <h3 className="sk-block-title">CERTIFICATIONS</h3>
          <div className="sk-certs-list">
            {CERTS.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="sk-cert-item"
              >
                <div className="sk-cert-left">
                  <span className="sk-cert-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="sk-cert-info">
                    <p className="sk-cert-name">{c.name}</p>
                    <p className="sk-cert-org">{c.org}</p>
                  </div>
                </div>
                <span className="sk-cert-link">View ↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* ══ EDUCATION ══ */}
        <div className="sk-block">
          <h3 className="sk-block-title">EDUCATION</h3>
          <div className="sk-edu-grid">
            <div className="sk-edu-card">
              <span className="sk-edu-icon">🎓</span>
              <div>
                <p className="sk-edu-degree">B.Tech in Computer Science Engineering</p>
                <p className="sk-edu-school">Sister Nivedita University</p>
                <div className="sk-edu-meta">
                  <span>📅 08/2023 – 07/2027</span>
                  <span>📍 Kolkata</span>
                </div>
              </div>
            </div>
            <div className="sk-edu-card">
              <span className="sk-edu-icon">🏫</span>
              <div>
                <p className="sk-edu-degree">Science Stream</p>
                <p className="sk-edu-school">Auxilium Convent School</p>
                <div className="sk-edu-meta">
                  <span>📅 04/2009 – 03/2023</span>
                  <span>📍 Bandel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ CURRENTLY EXPLORING ══ */}
        <div className="sk-block">
          <h3 className="sk-block-title">CURRENTLY<br /><span className="sk-title-accent">EXPLORING</span></h3>
          <div className="sk-exploring">
            {EXPLORING.map((t) => (
              <span key={t} className="sk-explore-pill">{t}</span>
            ))}
          </div>
        </div>

        {/* ══ LANGUAGES ══ */}
        <div className="sk-block sk-block-last">
          <h3 className="sk-block-title">LANGUAGES</h3>
          <div className="sk-langs">
            {LANGS.map((l) => (
              <div key={l.name} className="sk-lang-row">
                <div className="sk-lang-info">
                  <span className="sk-lang-name">{l.name}</span>
                  <span className="sk-lang-level">{l.level}</span>
                </div>
                <div className="sk-lang-dots">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`sk-dot ${i < l.filled ? "sk-dot-on" : "sk-dot-off"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        /* ── BASE ── */
        .sk {
          padding: clamp(80px,10vw,120px) clamp(20px,5vw,60px) clamp(20px,3vw,40px);
          background: #000;
          color: #fff;
        }

        /* ══ SHARED HEADING SYSTEM ══ */
        .sk-main-title,
        .sk-block-title {
          font-size: clamp(28px,4vw,52px);
          font-weight: 900;
          letter-spacing: -.03em;
          line-height: .95;
          color: #fff;
          margin: 0;
        }
        .sk-title-accent { color: #8b5cf6; }

        /* "What I Bring to the Table" heading */
        .sk-hero-heading { margin-bottom: 48px; }

        /* Faint horizontal rule between skill cards and Hackathons */
        .sk-section-divider {
          height: 1px;
          background: rgba(255,255,255,.08);
          margin-bottom: 64px;
        }

        /* Block title — faint divider line under each heading */
        .sk-block-title {
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        /* ── Skill Groups ── */
        .sk-groups {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 14px;
          /* Spacing before the divider */
          margin-bottom: 56px;
        }
        .sk-group {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 16px;
          padding: 22px 24px;
          transition: border-color .2s, transform .2s;
        }
        .sk-group:hover { border-color: rgba(139,92,246,.35); transform: translateY(-3px); }
        .sk-group-head  { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
        .sk-group-dot   { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .sk-group-label { font-size:13px; font-weight:700; letter-spacing:.04em; }
        .sk-pills       { display:flex; flex-wrap:wrap; gap:7px; }
        .sk-pill {
          padding: 6px 13px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          transition: all .2s;
          display: inline-block;
        }
        .sk-pill:hover {
          background: var(--pc, #8b5cf6);
          border-color: var(--pc, #8b5cf6);
          color: #ffffff;
        }

        /* ── Block wrapper ── */
        .sk-block       { margin-bottom: 72px; }
        .sk-block-last  { margin-bottom: 0; }

        /* ── Hackathons ── */
        .sk-hacks { display:flex; flex-direction:column; gap:12px; }
        .sk-hack  {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 14px;
          padding: 20px 22px;
          transition: border-color .2s, transform .2s;
        }
        .sk-hack:hover { border-color: rgba(139,92,246,.4); transform: translateX(4px); }
        .sk-hack-top  {
          display:flex; justify-content:space-between;
          align-items:flex-start; gap:12px; margin-bottom:10px; flex-wrap:wrap;
        }
        .sk-hack-name  { font-size:16px; font-weight:700; color:#fff; margin-bottom:5px; }
        .sk-hack-badge {
          display:inline-block; font-size:12px; font-weight:600;
          color:#fbbf24;
          background: rgba(251,191,36,.1);
          border: 1px solid rgba(251,191,36,.25);
          border-radius:99px; padding:3px 12px;
        }
        .sk-hack-date  { font-size:11px; color:rgba(255,255,255,.3); white-space:nowrap; }
        .sk-hack-bullets { list-style:none; display:flex; flex-direction:column; gap:5px; }
        .sk-hack-bullets li {
          font-size:13px; color:rgba(255,255,255,.5); font-weight:300;
          padding-left:16px; position:relative; line-height:1.6;
        }
        .sk-hack-bullets li::before {
          content:'·'; position:absolute; left:0;
          color:#8b5cf6; font-size:18px; line-height:1.1;
        }

        /* ══ CERTIFICATIONS — always visible ══ */
        .sk-certs-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sk-cert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          background: #0d0d0d;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          text-decoration: none;
          transition: background .2s, border-color .2s, transform .2s;
          opacity: 1;
          visibility: visible;
        }
        .sk-cert-item:hover {
          background: #131318;
          border-color: #8b5cf6;
          transform: translateX(4px);
        }
        .sk-cert-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          min-width: 0;
        }
        .sk-cert-num {
          font-size: 12px;
          font-weight: 800;
          color: #8b5cf6;
          flex-shrink: 0;
          font-family: monospace;
          min-width: 24px;
        }
        .sk-cert-info { flex:1; min-width:0; }
        .sk-cert-name {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
          line-height: 1.45;
          white-space: normal;
        }
        .sk-cert-org {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
        }
        .sk-cert-link {
          font-size: 12px;
          font-weight: 700;
          color: #8b5cf6;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Education ── */
        .sk-edu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .sk-edu-card {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 14px;
          padding: 20px 22px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          transition: border-color .2s;
        }
        .sk-edu-card:hover { border-color: rgba(139,92,246,.35); }
        .sk-edu-icon   { font-size:24px; flex-shrink:0; }
        .sk-edu-degree { font-size:15px; font-weight:700; color:#fff; margin-bottom:4px; }
        .sk-edu-school { font-size:13px; font-weight:600; color:#8b5cf6; margin-bottom:8px; }
        .sk-edu-meta   { display:flex; gap:14px; flex-wrap:wrap; }
        .sk-edu-meta span { font-size:11px; color:rgba(255,255,255,.4); }

        /* ── Currently Exploring ── */
        .sk-exploring { display:flex; flex-wrap:wrap; gap:10px; }
        .sk-explore-pill {
          padding: 9px 18px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 600;
          background: #0d0d0d;
          border: 1.5px solid #2a2a2a;
          color: rgba(255,255,255,.75);
          transition: all .2s;
          display: inline-block;
        }
        .sk-explore-pill:hover {
          background: rgba(139,92,246,.15);
          border-color: #8b5cf6;
          color: #fff;
        }

        /* ── Languages ── */
        .sk-langs {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 12px;
        }
        .sk-lang-row {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          transition: border-color .2s;
        }
        .sk-lang-row:hover { border-color: rgba(139,92,246,.35); }
        .sk-lang-info  { display:flex; flex-direction:column; gap:3px; }
        .sk-lang-name  { font-size:16px; font-weight:700; color:#fff; }
        .sk-lang-level { font-size:11px; color:rgba(255,255,255,.4); }
        .sk-lang-dots  { display:flex; gap:8px; }
        .sk-dot        { width:18px; height:18px; border-radius:50%; flex-shrink:0; transition:transform .2s; }
        .sk-dot-on     { background:#8b5cf6; box-shadow:0 0 8px rgba(139,92,246,.5); }
        .sk-dot-off    { background:transparent; border:2px solid #2a2a2a; }
        .sk-lang-row:hover .sk-dot-on { transform:scale(1.1); }

        @media(max-width:760px){
          .sk-groups   { grid-template-columns:1fr; }
          .sk-edu-grid { grid-template-columns:1fr; }
          .sk-langs    { grid-template-columns:1fr; }
          .sk-main-title,
          .sk-block-title { font-size: clamp(24px,7vw,38px); }
        }
      `}</style>
    </section>
  );
}