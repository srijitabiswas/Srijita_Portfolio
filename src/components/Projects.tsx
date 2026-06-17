import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Savor",
    cat: "UX Design · React",
    tags: ["React", "UX Design", "Tailwind"],
    desc: "Decision-first food ordering app designed to reduce choice overload and help users order faster with clarity.",
    path: "/case/savor",
    img: "/images/savor.png",
    accent: "#D4712A",
    filter: "UX",
  },
  {
    id: 2,
    num: "02",
    title: "LuxeStay Villas",
    cat: "UX Design · Figma",
    tags: ["Figma", "UX Research", "Prototyping"],
    desc: "End-to-end product design for a dual-sided rental platform — from user research and wireframes to high-fidelity Figma prototypes.",
    path: "/case/luxestay",
    img: "/images/luxestay.png",
    accent: "#7C6FCD",
    filter: "UX",
  },
  {
    id: 3,
    num: "03",
    title: "SplitX",
    cat: "Full-Stack · Hackathon",
    tags: ["React Native", "Node.js", "MongoDB"],
    desc: "Smart group expense tracker built in 36 hours. RESTful APIs, structured DB schema, cascade deletion and scalable backend architecture.",
    path: "/case/splitx",
    img: "/images/splitx.png",
    accent: "#2D8653",
    filter: "Dev",
  },
  {
    id: 4,
    num: "04",
    title: "Wellness Personas of SNU",
    cat: "ML · Streamlit",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    desc: "ML-powered lifestyle persona discovery app using KMeans clustering. Users discover their wellness persona through interactive sliders and radar charts.",
    path: "/case/wellness",
    img: "/images/wellness.png",
    accent: "#2E5FE8",
    filter: "ML",
  },
  {
    id: 5,
    num: "05",
    title: "Fake News Classification",
    cat: "NLP · Machine Learning",
    tags: ["Python", "TF-IDF", "Scikit-learn"],
    desc: "NLP-based supervised ML system that classifies news articles as fake or real with 93.58% accuracy.",
    path: "/case/fakenews",
    img: "/images/fakenews.png",
    accent: "#C4A000",
    filter: "ML",
  },
  {
    id: 6,
    num: "06",
    title: "ZeroShield AI",
    cat: "Full-Stack · Cybersecurity",
    tags: ["React", "Node.js", "TypeScript", "Tailwind"],
    desc: "AI-powered cybersecurity SOC dashboard with real-time threat detection, attack simulation engine, and automated response handling.",
    path: "/case/zeroshield",
    img: "/images/zeroshield.png",
    accent: "#C43030",
    filter: "Dev",
  },
];

type Filter = "All" | "UX" | "Dev" | "ML";
const FILTERS: Filter[] = ["All", "UX", "Dev", "ML"];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Filter>("All");
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pj-head > *", { y: 30, opacity: 0, stagger: .1, duration: .8, ease: "expo.out", scrollTrigger: { trigger: ".pj-head", start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.from(".pj-card", {
  y: 40,
  stagger: 0.08,
  duration: 0.7,
  ease: "expo.out",
});
  }, [active]);

  const visible = active === "All" ? PROJECTS : PROJECTS.filter(p => p.filter === active);

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
            <div key={p.id} className="pj-card"
                 style={{ "--pa": p.accent } as React.CSSProperties}
                 onClick={() => navigate(p.path)}>
              <div className="pj-card-img">
                <img src={p.img} alt={p.title}
                     onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="pj-card-body">
                <div className="pj-card-top">
                  <p className="pj-card-cat">{p.cat}</p>
                  <button className="pj-arr" onClick={e => { e.stopPropagation(); navigate(p.path); }}>↗</button>
                </div>
                <h3 className="pj-card-title">{p.title}</h3>
                <p className="pj-card-desc">{p.desc}</p>
                <div className="pj-tags">
                  {p.tags.map(t => <span key={t} className="pj-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pj { padding:clamp(80px,10vw,130px) clamp(20px,5vw,60px); background:#050505; }
        .pj-inner { max-width: 1280px; margin: 0 auto; }

        .pj-head { margin-bottom:44px; text-align:center; }
        .pj-eye {
          font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
          color:rgba(255,255,255,0.35); margin-bottom:24px;
          display:flex; align-items:center; justify-content:center; gap:16px;
        }
        .pj-eye::before, .pj-eye::after { content:''; height:1px; width:80px; background:rgba(255,255,255,0.15); }
        .pj-h2   {
          font-size:clamp(34px,5vw,58px); font-weight:900; letter-spacing:-.03em; line-height:1.08;
          margin-bottom:28px; color:#fff; text-align:left;
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

        .pj-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }

        .pj-card {
  background:#151515;
  border-radius:18px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,0.12);
}

        .pj-card:hover {
          transform:translateY(-6px);
          box-shadow:0 24px 60px rgba(0,0,0,.45);
          border-color: var(--pa, #8b5cf6);
        }

        .pj-card-img {
  width:100%;
  height:200px;
  overflow:hidden;
  position:relative;
  background:#111;
}
        .pj-card-img img { width:100%; height:100%; object-fit:cover; object-position:top; display:block; transition:transform .5s ease; }
        .pj-card:hover .pj-card-img img { transform:scale(1.04); }

        .pj-card-body { padding:22px 24px 26px; }
        .pj-card-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .pj-card-cat  { font-size:10.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color: var(--pa, #8b5cf6); }
        .pj-arr {
          width:34px; height:34px; border-radius:50%; border:1.5px solid var(--pa, rgba(255,255,255,0.2));
          display:flex; align-items:center; justify-content:center; font-size:14px; color:#fff; flex-shrink:0;
          transition:all .2s; background:none; cursor:pointer;
        }
        .pj-arr:hover { background:var(--pa, #8b5cf6); border-color:var(--pa, #8b5cf6); }
        .pj-card-title { font-size:clamp(17px,2vw,20px); font-weight:800; letter-spacing:-.01em; color:#fff; margin-bottom:10px; }
        .pj-card-desc {
  font-size:13.5px;
  line-height:1.7;
  color:rgba(255,255,255,0.75);
  margin-bottom:18px;
  font-weight:400;
}
        .pj-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .pj-tag {
  padding:5px 13px;
  border-radius:99px;
  font-size:11px;
  font-weight:600;
  background:rgba(255,255,255,0.08);
  border:1px solid rgba(255,255,255,0.15);
  color:#ffffff;
}

        @media(max-width:860px) { .pj-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}