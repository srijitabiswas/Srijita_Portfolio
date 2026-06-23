import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

type ProjectT = {
  id: number;
  num: string;
  title: string;
  cat: string;
  tags: string[];
  desc: string;
  path?: string;     // internal case-study route
  href?: string;      // external live-demo link (used when no case page exists yet)
  img: string;
  icon: string;        // emoji fallback shown if screenshot is missing
  accent: string;
  filter: "UX" | "Dev" | "ML";
};

const PROJECTS: ProjectT[] = [
  {
    id: 1,
    num: "01",
    title: "MediFlow",
    cat: "Full-Stack · AI Healthcare",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    desc: "AI-powered hospital queue & appointment system that predicts wait times in real time and tells patients exactly when to leave — not just a number in a line.",
    path: "/case/mediflow",
    img: "/images/mediflow.png",
    icon: "🏥",
    accent: "#22C55E",
    filter: "Dev",
  },
{
    id: 2,
    num: "09",
    title: "Glow-AI",
    cat: "AI · Computer Vision · Marketplace",
    tags: ["React", "MediaPipe", "Groq LLM", "Tailwind"],
    desc: "AI beauty & salon marketplace with live facial-analysis scanning, an LLM concierge for personalized recommendations, and a Mumbai-wide salon discovery engine. Built in a 48-hour buildathon.",
    path: "/case/glowai",
    img: "/images/glowai.png",
    icon: "✨",
    accent: "#EC4899",
    filter: "ML",
  },

  {
    id: 3,
    num: "03",
    title: "Savor",
    cat: "Full-Stack · Decision UX",
    tags: ["React", "Node.js", "MongoDB", "AI"],
    desc: "Decision-first food ordering platform with a natural-language Crave Assistant, 1,100+ structured dish records, and budget-first discovery — built to kill decision fatigue, not feed it.",
    path: "/case/savor",
    img: "/images/savor.png",
    icon: "🍽️",
    accent: "#D4712A",
    filter: "UX",
  },

  {
    id: 3,
    num: "04",
    title: "DeskGuard",
    cat: "Full-Stack · Library Systems",
    tags: ["React", "Node.js", "MongoDB", "Framer Motion"],
    desc: "University library seat-management OS with live SVG floor maps, a trust-score system for responsible study habits, buddy reservations, and abandoned-seat auto-detection.",
    path: "/case/deskguard",
    img: "/images/deskguard.png",
    icon: "🪪",
    accent: "#2563EB",
    filter: "Dev",
  },
 {
    id: 5,
    num: "5",
    title: "ZeroShield AI",
    cat: "Full-Stack · Cybersecurity",
    tags: ["React", "Node.js", "TypeScript", "Tailwind"],
    desc: "AI-powered cybersecurity SOC dashboard with real-time threat detection, attack simulation engine, and automated response handling.",
    path: "/case/zeroshield",
    img: "/images/zeroshield.png",
    icon: "🛡️",
    accent: "#C43030",
    filter: "Dev",
  },
{
    id: 6,
    num: "06",
    title: "Fake News Classification",
    cat: "NLP · Machine Learning",
    tags: ["Python", "TF-IDF", "Scikit-learn"],
    desc: "NLP-based supervised ML system that classifies news articles as fake or real with 93.58% accuracy.",
    path: "/case/fakenews",
    img: "/images/fakenews.png",
    icon: "📰",
    accent: "#C4A000",
    filter: "ML",
  },
{
    id: 7,
    num: "07",
    title: "TeamForge",
    cat: "Full-Stack · Collaboration Platform",
    tags: ["React", "Node.js", "MongoDB", "Matching AI"],
    desc: "Student innovation OS guiding idea → team → execution. Generates project blueprints from plain-language ideas and scores team compatibility via a TeamDNA system.",
    path: "/case/teamforge",
    img: "/images/teamforge.png",
    icon: "🧩",
    accent: "#8B5CF6",
    filter: "Dev",
  },
  {
    id: 8,
    num: "08",
    title: "LuxeStay Villas",
    cat: "UX Design · Figma",
    tags: ["Figma", "UX Research", "Prototyping"],
    desc: "End-to-end product design for a dual-sided rental platform — from user research and wireframes to high-fidelity Figma prototypes.",
    path: "/case/luxestay",
    img: "/images/luxestay.png",
    icon: "🏖️",
    accent: "#7C6FCD",
    filter: "UX",
  },
 {
    id: 9,
    num: "09",
    title: "Wellness Personas of SNU",
    cat: "ML · Streamlit",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    desc: "ML-powered lifestyle persona discovery app using KMeans clustering. Users discover their wellness persona through interactive sliders and radar charts.",
    path: "/case/wellness",
    img: "/images/wellness.png",
    icon: "🧘",
    accent: "#2E5FE8",
    filter: "ML",
  },
  {
    id: 10,
    num: "10",
    title: "SplitX",
    cat: "Full-Stack · Expense Tracking",
    tags: ["JavaScript", "Node.js", "MongoDB"],
    desc: "Smart group expense tracker with automatic splitting, settlement tracking, and a trust-score badge system — built to keep shared finances friction-free.",
    path: "/case/splitx",
    img: "/images/splitx.png",
    icon: "💸",
    accent: "#2D8653",
    filter: "Dev",
  },
];

type Filter = "All" | "UX" | "Dev" | "ML";
const FILTERS: Filter[] = ["All", "UX", "Dev", "ML"];

/* ── Single project card with 3D mouse-tilt + glare ── */
function ProjectCard({ p, onOpen }: { p: ProjectT; onOpen: (p: ProjectT) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;   // 0..1
    const py = y / rect.height;  // 0..1
    const rx = (py - 0.5) * -3.5; // tilt X — subtle
    const ry = (px - 0.5) * 3.5;  // tilt Y — subtle
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={cardRef}
      className="pj-card"
      style={{ "--pa": p.accent } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(p)}
    >
      <div className="pj-card-glare" />
      <div className="pj-card-img">
        {imgOk ? (
          <img
            src={p.img}
            alt={p.title}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="pj-card-fallback">
            <span>{p.icon}</span>
          </div>
        )}
        {p.href && !p.path && (
          <span className="pj-live-badge">Live ↗</span>
        )}
      </div>
      <div className="pj-card-body">
        <div className="pj-card-top">
          <p className="pj-card-cat">{p.cat}</p>
          <button
            className="pj-arr"
            onClick={(e) => { e.stopPropagation(); onOpen(p); }}
          >
            ↗
          </button>
        </div>
        <h3 className="pj-card-title">{p.title}</h3>
        <p className="pj-card-desc">{p.desc}</p>
        <div className="pj-tags">
          {p.tags.map((t) => <span key={t} className="pj-tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Filter>("All");
  const navigate = useNavigate();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".pj-head > *", { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }
      gsap.from(".pj-head > *", {
        y: 28, opacity: 0, filter: "blur(6px)", stagger: .1, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-head", start: "top 80%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const cardTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardTriggerRef.current?.kill();

    if (reduceMotion) {
      gsap.set(".pj-card", { y: 0, opacity: 1, filter: "blur(0px)" });
      return;
    }
    const tween = gsap.fromTo(".pj-card",
      { y: 36, opacity: 0, filter: "blur(6px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)",
        stagger: 0.08, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".pj-grid", start: "top 88%", once: true },
      }
    );
    cardTriggerRef.current = tween.scrollTrigger ?? null;
  }, [active]);

  const visible = active === "All" ? PROJECTS : PROJECTS.filter(p => p.filter === active);

  const openProject = (p: ProjectT) => {
    if (p.path) navigate(p.path);
    else if (p.href) window.open(p.href, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={ref} className="pj" id="projects">
      <div className="pj-inner">

        <div className="pj-head">
          <p className="pj-eye"><span>Selected Work</span></p>
          <h2 className="pj-h2">PROJECTS THAT<br /><em>DEFINE ME</em></h2>
          <div className="pj-filters">
            {FILTERS.map(f => (
              <button key={f} className={`pj-filter ${active === f ? "pj-filter-on" : ""}`} onClick={() => setActive(f)}>{f}</button>
            ))}
          </div>
        </div>

        <div className="pj-grid">
          {visible.map(p => (
            <ProjectCard key={p.id} p={p} onOpen={openProject} />
          ))}
        </div>
      </div>

      <style>{`
        .pj { padding:clamp(80px,10vw,130px) clamp(20px,5vw,60px); background:#050505; }
        .pj-inner { max-width: 1280px; margin: 0 auto; }

        .pj-head { margin-bottom:56px; text-align:center; }
        .pj-eye {
          font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
          color:rgba(255,255,255,0.35); margin-bottom:24px;
          display:flex; align-items:center; justify-content:center; gap:16px;
        }
        .pj-eye::before, .pj-eye::after { content:''; height:1px; width:80px; background:rgba(255,255,255,0.15); }
        .pj-h2   {
          font-size:clamp(24px,3.4vw,40px); font-weight:900; letter-spacing:-.03em; line-height:1.1;
          margin-bottom:24px; color:#fff; text-align:left;
        }
        .pj-h2 em { color:#8b5cf6; font-style:normal; }

        .pj-filters { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-start; }
        .pj-filter {
          padding:9px 22px; border-radius:99px; font-size:13px; font-weight:600; letter-spacing:.03em;
          border:1.5px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.55); background:transparent;
          transition:all .2s; cursor:pointer;
        }
        .pj-filter:hover { border-color:#8b5cf6; color:#fff; }
        .pj-filter-on { background:#8b5cf6; border-color:#8b5cf6; color:#fff; }

        .pj-grid {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:32px 28px;
          max-width: 1080px;
          margin: 0 auto;
        }

        /* ══ 3D TILT CARD ══ */
        .pj-card {
          position: relative;
          background:#151515;
          border-radius:18px;
          overflow:hidden;
          border:1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          transform-style: preserve-3d;
          transform:
            perspective(1000px)
            rotateX(var(--rx, 0deg))
            rotateY(var(--ry, 0deg))
            translateY(0);
          transition: transform .25s cubic-bezier(.22,1,.36,1), border-color .25s, box-shadow .25s;
          will-change: transform;
        }
        .pj-card:hover {
          box-shadow:0 30px 70px rgba(0,0,0,.5);
          border-color: var(--pa, #8b5cf6);
        }

        /* moving glare that follows cursor */
        .pj-card-glare {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            rgba(255,255,255,0.12) 0%,
            rgba(255,255,255,0) 55%
          );
          transition: opacity .3s ease;
        }
        .pj-card:hover .pj-card-glare { opacity: 1; }

        .pj-card-img {
          width:100%;
          height:150px;
          overflow:hidden;
          position:relative;
          background:#111;
        }
        .pj-card-img img {
          width:100%; height:100%; object-fit:cover; object-position:top; display:block;
          transition:transform .5s ease;
        }
        .pj-card:hover .pj-card-img img { transform:scale(1.06); }

        .pj-card-fallback {
          width:100%; height:100%;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg, var(--pa, #8b5cf6) 0%, #0a0a0a 130%);
        }
        .pj-card-fallback span { font-size:30px; filter: drop-shadow(0 4px 14px rgba(0,0,0,.4)); }

        .pj-live-badge {
          position:absolute; top:12px; right:12px;
          background: rgba(0,0,0,.55);
          backdrop-filter: blur(6px);
          border:1px solid var(--pa, #8b5cf6);
          color:#fff; font-size:10.5px; font-weight:700; letter-spacing:.04em;
          padding:5px 11px; border-radius:99px;
        }

        .pj-card-body { padding:22px 22px 24px; position:relative; z-index:2; }
        .pj-card-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .pj-card-cat  { font-size:9.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color: var(--pa, #8b5cf6); }
        .pj-arr {
          width:28px; height:28px; border-radius:50%; border:1.5px solid var(--pa, rgba(255,255,255,0.2));
          display:flex; align-items:center; justify-content:center; font-size:11px; color:#fff; flex-shrink:0;
          transition:all .2s; background:none; cursor:pointer;
        }
        .pj-arr:hover { background:var(--pa, #8b5cf6); border-color:var(--pa, #8b5cf6); }
        .pj-card-title { font-size:16px; font-weight:800; letter-spacing:-.01em; color:#fff; margin-bottom:10px; }
        .pj-card-desc {
          font-size:12.5px;
          line-height:1.7;
          color:rgba(255,255,255,0.65);
          margin-bottom:18px;
          font-weight:400;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pj-tags { display:flex; flex-wrap:wrap; gap:7px; }
        .pj-tag {
          padding:4px 11px;
          border-radius:99px;
          font-size:10px;
          font-weight:600;
          background:rgba(255,255,255,0.07);
          border:1px solid rgba(255,255,255,0.14);
          color:#ffffff;
        }

        @media(max-width:1100px) {
          .pj-grid { grid-template-columns:repeat(2,minmax(0,1fr)); max-width: 720px; }
        }
        @media(max-width:640px) {
          .pj-grid { grid-template-columns:1fr; max-width: 420px; gap: 24px; }
          .pj-card { transform: none !important; }
          .pj-card-glare { display:none; }
        }
      `}</style>
    </section>
  );
}