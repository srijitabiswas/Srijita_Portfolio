import { useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const HeroAvatar = lazy(() => import("./HeroAvatar"));

export default function Landing() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(".ln-hi",           { y: 24, opacity: 0, duration: 0.55, ease: "expo.out" })
        .from(".ln-name",         { y: 44, opacity: 0, duration: 0.65, ease: "expo.out" }, "-=.3")
        .from(".ln-creative-blk", { y: 28, opacity: 0, duration: 0.6,  ease: "expo.out" }, "-=.35")
        .from(".ln-desc",         { y: 20, opacity: 0, duration: 0.5,  ease: "expo.out" }, "-=.3")
        .from(".ln-actions",      { y: 18, opacity: 0, duration: 0.45, ease: "expo.out" }, "-=.25")
        .from(".ln-socials",      { y: 14, opacity: 0, duration: 0.4,  ease: "expo.out" }, "-=.2")
        .from(".ln-hero-right",   { x: 40, opacity: 0, duration: 0.9,  ease: "expo.out" }, "-=1.1");

      /* What I Do scroll transition */
      gsap.fromTo(".ln-what",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: ".ln-what", start: "top 88%", once: true } }
      );
      gsap.fromTo(".ln-what-heading",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: ".ln-what", start: "top 82%", once: true } }
      );
      gsap.fromTo(".ln-wid-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.15,
          scrollTrigger: { trigger: ".ln-wid-cards", start: "top 85%", once: true } }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  const goTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const CARDS = [
    { icon:"💻", title:"Develop",    color:"#60A5FA", border:"rgba(96,165,250,0.3)",  bg:"rgba(96,165,250,0.05)",
      text:"Build responsive web applications and interactive digital products with a focus on performance and usability." },
    { icon:"🎨", title:"Design",     color:"#A78BFA", border:"rgba(167,139,250,0.3)", bg:"rgba(167,139,250,0.05)",
      text:"Create intuitive interfaces, user flows, and user‑centered experiences through research and design thinking." },
    { icon:"🤖", title:"Explore AI", color:"#F472B6", border:"rgba(244,114,182,0.3)", bg:"rgba(244,114,182,0.05)",
      text:"Experiment with machine learning and intelligent systems to build solutions for real‑world problems." },
  ];

  return (
    <section ref={sec} className="ln" id="home">

      {/* ══ HERO ══ */}
      <div className="ln-hero">
        <div className="ln-hero-grid">

          {/* LEFT — all text */}
          <div className="ln-hero-left">
            <p className="ln-hi">Hi, I'm</p>
            <h1 className="ln-name">Srijita Biswas</h1>

            <div className="ln-creative-blk">
              <span className="ln-creative-label">A Creative</span>
              <div className="ln-roles-row">
                <span className="ln-role-dev">DEVELOPER</span>
                <span className="ln-role-sep">&amp;</span>
                <span className="ln-role-des">DESIGNER</span>
              </div>
            </div>

            <p className="ln-desc">
              I craft digital products at the intersection of design and engineering —
              from pixel-perfect interfaces to scalable frontend systems. Driven by a passion
              for usability, aesthetics, and performance, I build experiences that feel
              as good as they look.
            </p>

            <div className="ln-actions">
              <a href="#work" className="ln-btn-fill"
                 onClick={(e) => { e.preventDefault(); goTo("#work"); }}>
                Explore My Work
              </a>
              <a href="/resume.pdf" target="_blank" className="ln-btn-out">
                View Resume
              </a>
            </div>

            <div className="ln-socials">
              <a href="https://github.com/srijitabiswas" target="_blank" rel="noreferrer" className="ln-social">GitHub</a>
              <span>·</span>
              <a href="https://www.linkedin.com/in/srijita-biswas-9690a3284" target="_blank" rel="noreferrer" className="ln-social">LinkedIn</a>
            </div>
          </div>

          {/* RIGHT — avatar */}
          <div className="ln-hero-right">
            <Suspense fallback={<div className="ln-avatar-ph"/>}>
              <HeroAvatar />
            </Suspense>
          </div>
        </div>
      </div>

      {/* ══ WHAT I DO ══ */}
      <div className="ln-what" id="what">
        <div className="ln-what-inner">
          <div className="ln-what-heading">
            <h2 className="ln-what-title">WHAT<br />I DO</h2>
          </div>
          <div className="ln-wid-cards">
            {CARDS.map((c) => (
              <div key={c.title} className="ln-wid-card"
                style={{ "--card-color":c.color, "--card-border":c.border, "--card-bg":c.bg } as React.CSSProperties}>
                <span className="ln-wid-icon">{c.icon}</span>
                <div>
                  <p className="ln-wid-title" style={{ color: c.color }}>{c.title}</p>
                  <p className="ln-wid-text">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ln { background:#000; color:#fff; }

        /* ── HERO LAYOUT ── */
        .ln-hero {
          min-height: 100vh;
          padding: calc(var(--nav-h) + 20px) clamp(20px,5vw,72px) 20px;
          display: flex;
          align-items: center;
          max-width: 1320px;
          margin: 0 auto;
        }
        .ln-hero-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 45% 55%;
          gap: clamp(20px,4vw,40px);
          align-items: center;
        }
        .ln-hero-left {
          display: flex;
          flex-direction: column;
          gap: 15px;
          transform: translateY(-35px);
        }
        .ln-hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ln-avatar-ph {
          width: 100%;
          max-width: 820px;
          height: 520px;
          background: rgba(139,92,246,0.04);
          border-radius: 20px;
        }

        /* ── TEXT ── */
        .ln-hi   { font-size:clamp(12px,1.6vw,24px); font-weight:400; color:rgba(255,255,255,.55); margin:0; }
        .ln-name { font-size:clamp(20px,4.8vw,60px); font-weight:900; letter-spacing:-.03em; color:#fff; margin:0; line-height:1; }

        .ln-creative-blk { display:flex; flex-direction:column; gap:2px; }
        .ln-creative-label { font-size:clamp(12px,1.6vw,24px); color:rgba(255,255,255,.42); font-weight:400; }
        .ln-roles-row { display:flex; align-items:baseline; gap:12px; flex-wrap:wrap; }
        .ln-role-dev { font-size:clamp(20px,4.0vw,55px); font-weight:900; letter-spacing:.02em; color:#fff; line-height:1.05; }
        .ln-role-sep { font-size:clamp(12px,3.5vw,50px); font-weight:900; color:rgba(255,255,255,.35); line-height:1.05; }
        .ln-role-des { font-size:clamp(20px,4.0vw,55px); font-weight:900; letter-spacing:.02em; color:#8b5cf6; line-height:1.05; }

        .ln-desc {
          font-size: clamp(10px,1.0vw,15px);
          line-height: 1.82;
          color: rgba(255,255,255,.48);
          max-width: 560px;
          font-weight: 300;
          margin: 0;
        }

        .ln-actions { display:flex; gap:12px; flex-wrap:wrap; }
        .ln-btn-fill,.ln-btn-out {
          display:inline-flex; align-items:center;
          padding:12px 24px; font-size:13px; font-weight:700;
          border-radius:10px; transition:all .25s;
          text-decoration:none; font-family:var(--font);
        }
        .ln-btn-fill { background:#8b5cf6; color:#fff; box-shadow:0 4px 24px rgba(139,92,246,.35); }
        .ln-btn-fill:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(139,92,246,.5); }
        .ln-btn-out  { background:rgba(255,255,255,.06); color:#fff; border:1.5px solid rgba(255,255,255,.18); }
        .ln-btn-out:hover { background:rgba(255,255,255,.11); transform:translateY(-2px); }

        .ln-socials { display:flex; align-items:center; gap:10px; }
        .ln-socials span { color:rgba(255,255,255,.18); }
        .ln-social { font-size:13px; font-weight:600; color:rgba(255,255,255,.38); transition:color .2s; text-decoration:none; }
        .ln-social:hover { color:#8b5cf6; }

        /* ══ WHAT I DO ══ */
        .ln-what {
          background: #000;
          padding: clamp(30px,5vw,50px) clamp(20px,5vw,60px) 80px;
          border-top: 1px solid rgba(255,255,255,.06);
          opacity: 1;
        }
        .ln-what-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 220px 1fr;
          gap: clamp(60px,8vw,120px); align-items: center;
        }
        .ln-what-heading { display:flex; align-items:center; }
        .ln-what-title {
          font-size: clamp(42px,6vw,80px);
          font-weight: 900; letter-spacing:-.04em; line-height:.92; color:#fff; margin:0;
        }
        .ln-wid-cards { display:flex; flex-direction:column; gap:20px; }
        .ln-wid-card {
          display:flex; align-items:flex-start; gap:18px;
          padding:24px 28px;
          background:var(--card-bg); border:1px solid var(--card-border);
          border-radius:16px;
          transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          cursor:default;
        }
        .ln-wid-card:hover {
          transform:translateX(8px);
          border-color:var(--card-color);
          box-shadow:0 0 32px rgba(139,92,246,0.1);
        }
        .ln-wid-icon  { font-size:28px; flex-shrink:0; margin-top:2px; }
        .ln-wid-title { font-size:16px; font-weight:800; margin-bottom:7px; letter-spacing:.01em; }
        .ln-wid-text  { font-size:14px; line-height:1.72; color:rgba(255,255,255,.44); font-weight:300; }

        /* ══ MOBILE ══ */
        @media(max-width:900px) {
          .ln-hero { padding:calc(var(--nav-h) + 16px) 20px 48px; align-items:flex-start; }
          .ln-hero-grid { grid-template-columns:1fr; gap:32px; }
          .ln-hero-right { order:-1; justify-content:flex-start; }
          .ln-avatar-ph { height:280px; }
          .ln-name { font-size:clamp(34px,10vw,52px); }
          .ln-role-dev,.ln-role-des { font-size:clamp(26px,8vw,40px); }
          .ln-role-sep { font-size:clamp(22px,7vw,36px); }
          .ln-roles-row { gap:8px; }
          .ln-desc { max-width:100%; }
          .ln-what { padding:60px 20px; }
          .ln-what-inner { grid-template-columns:1fr; gap:32px; }
          .ln-what-title { font-size:clamp(40px,11vw,64px); }
        }
        @media(max-width:480px) {
          .ln-name { font-size:20px; }
          .ln-role-dev,.ln-role-des { font-size:20px; }
          .ln-role-sep { font-size:20px; }
        }
      `}</style>
    </section>
  );
}
