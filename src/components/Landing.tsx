import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Landing = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.9 });

      // Stagger reveal each line
      tl.from(".l-name-top",    { y: "110%", duration: 1,   ease: "expo.out" })
        .from(".l-photo-wrap",  { scale: 0.85, opacity: 0, duration: 0.8, ease: "expo.out" }, "-=0.6")
        .from(".l-center-left", { x: -30, opacity: 0, duration: 0.7, ease: "expo.out" }, "-=0.5")
        .from(".l-center-right",{ x:  30, opacity: 0, duration: 0.7, ease: "expo.out" }, "-=0.7")
        .from(".l-name-bot",    { y: "110%", duration: 1,   ease: "expo.out" }, "-=0.5")
        .from(".l-footer span", { y: 16, opacity: 0, stagger: 0.08, duration: 0.5, ease: "expo.out" }, "-=0.4")
        .from(".l-scroll-hint", { opacity: 0, duration: 0.5 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="landing" id="home">
      {/* ── TOP ROLE ROW ── */}
      <div className="l-role-row">
        <span className="l-status">
          <span className="l-dot" /> Available for internships
        </span>
        <span className="l-location">Kolkata, India · 2026</span>
      </div>

      {/* ── BIG NAME TOP ── */}
      <div className="l-name-line">
        <div className="l-name-line__inner">
          <span className="l-name-top">SRIJITA</span>
        </div>
      </div>

      {/* ── CENTER: left info | photo | right info ── */}
      <div className="l-center">
        <div className="l-center-left">
          <p className="l-tagline">
            I design interfaces that feel<br />
            <em>clear, calm &amp; human.</em>
          </p>
          <div className="l-btns">
            <a href="#work" className="l-btn l-btn--fill">
              Explore Work <span>↗</span>
            </a>
            <a href="/resume.pdf" target="_blank" className="l-btn l-btn--ghost">
              Resume
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="l-photo-wrap">
          <div className="l-photo-frame">
            {/*
              ★ Replace this div with your photo:
              <img src="/images/photo.jpeg" alt="Srijita Biswas" />

              Photo should be ~600×800px, portrait orientation.
              Save it as: public/images/photo.jpeg
            */}
            <div className="l-photo-placeholder">
              <span>👤</span>
              <p>Add photo to<br />/public/images/photo.jpeg</p>
            </div>
            <div className="l-photo-tag">
              <span>SRIJITA BISWAS</span>
              <span>UI·UX DESIGNER</span>
            </div>
          </div>
        </div>

        <div className="l-center-right">
          <div className="l-stat">
            <span className="l-stat__num">05<span>+</span></span>
            <span className="l-stat__label">Projects</span>
          </div>
          <div className="l-stat">
            <span className="l-stat__num">8.47</span>
            <span className="l-stat__label">CGPA</span>
          </div>
          <div className="l-stat">
            <span className="l-stat__num l-stat__num--accent">OPEN</span>
            <span className="l-stat__label">Status</span>
          </div>
        </div>
      </div>

      {/* ── BIG NAME BOTTOM ── */}
      <div className="l-name-line l-name-line--right">
        <div className="l-name-line__inner">
          <span className="l-name-bot">
            <span className="l-name-outline">DESIGN</span>ER
          </span>
        </div>
      </div>

      {/* ── FOOTER BAR ── */}
      <div className="l-footer">
        <span>B.Tech CSE · 2023–2027</span>
        <span>Google UX Certified</span>
        <span>srijitabiswas05@email.com</span>
        <span className="l-footer-links">
          <a href="https://www.linkedin.com/in/srijita-biswas-9690a3284" target="_blank">LinkedIn</a>
          <a href="https://github.com/biswassrijita" target="_blank">GitHub</a>
        </span>
      </div>

      {/* ── SCROLL HINT ── */}
      <div className="l-scroll-hint">
        <div className="l-scroll-line" />
        <span>Scroll</span>
      </div>

      <style>{`
        /* ── LANDING ────────────────────────────── */
        .landing {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          padding-top: var(--nav-h);
          position: relative;
          overflow: hidden;
        }

        /* role row */
        .l-role-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px clamp(20px,5vw,64px) 0;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-50);
        }
        .l-status { display: flex; align-items: center; gap: 8px; }
        .l-dot {
          display: inline-block;
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }

        /* name lines */
        .l-name-line {
          overflow: hidden;
          line-height: 0.85;
          padding: 0 clamp(16px,3vw,44px);
          margin-top: auto;
        }
        .l-name-line--right { text-align: right; margin-top: 0; }
        .l-name-line__inner { overflow: hidden; }

        .l-name-top,
        .l-name-bot {
          display: block;
          font-size: clamp(80px, 14vw, 200px);
          font-weight: 900;
          letter-spacing: -0.035em;
          color: var(--ink);
          white-space: nowrap;
        }
        .l-name-outline {
          -webkit-text-stroke: 2.5px var(--ink);
          color: transparent;
        }

        /* center */
        .l-center {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          padding: 12px clamp(20px,5vw,64px);
          position: relative;
          z-index: 2;
        }

        /* left copy */
        .l-center-left {
          flex: 1;
          max-width: 280px;
          padding-bottom: 20px;
        }
        .l-tagline {
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.65;
          color: var(--ink);
          margin-bottom: 24px;
          font-weight: 300;
        }
        .l-tagline em { font-style: normal; font-weight: 700; }
        .l-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .l-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 22px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          border-radius: 99px;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .l-btn--fill {
          background: var(--ink);
          color: var(--bg);
        }
        .l-btn--fill:hover { background: var(--accent); }
        .l-btn--ghost {
          border: 1.5px solid rgba(5,5,5,0.2);
          color: var(--ink);
        }
        .l-btn--ghost:hover { border-color: var(--accent); color: var(--accent); }

        /* photo */
        .l-photo-wrap { flex-shrink: 0; }
        .l-photo-frame {
          position: relative;
          width: clamp(180px, 20vw, 290px);
          aspect-ratio: 3/4;
          overflow: hidden;
          border-radius: 20px;
          border: 2px solid var(--border);
          box-shadow: 0 24px 64px rgba(5,5,5,0.12);
        }
        .l-photo-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.6s ease;
        }
        .l-photo-frame:hover img { transform: scale(1.04); }
        /* corner accents */
        .l-photo-frame::before,
        .l-photo-frame::after {
          content: '';
          position: absolute;
          width: 22px; height: 22px;
          z-index: 2;
        }
        .l-photo-frame::before {
          top: 10px; left: 10px;
          border-top: 2px solid var(--accent);
          border-left: 2px solid var(--accent);
          border-radius: 4px 0 0 0;
        }
        .l-photo-frame::after {
          bottom: 10px; right: 10px;
          border-bottom: 2px solid var(--accent);
          border-right: 2px solid var(--accent);
          border-radius: 0 0 4px 0;
        }
        .l-photo-tag {
          position: absolute;
          bottom: 12px; left: 12px; right: 12px;
          background: rgba(238,247,255,0.88);
          backdrop-filter: blur(8px);
          border-radius: 10px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .l-photo-tag span {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-50);
        }
        .l-photo-tag span:first-child { color: var(--ink); }
        .l-photo-placeholder {
          width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #d4e8f8, #b8d4ef);
          gap: 12px;
          padding: 20px;
          text-align: center;
        }
        .l-photo-placeholder span { font-size: 48px; opacity: 0.4; }
        .l-photo-placeholder p {
          font-size: 11px;
          color: rgba(5,5,5,0.4);
          font-family: monospace;
          line-height: 1.6;
        }

        /* right stats */
        .l-center-right {
          flex: 1;
          max-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          padding-bottom: 20px;
        }
        .l-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .l-stat__num {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .l-stat__num span { font-size: 0.6em; }
        .l-stat__num--accent { color: var(--accent); font-size: 18px; }
        .l-stat__label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-50);
        }

        /* footer */
        .l-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px clamp(20px,5vw,64px);
          border-top: 1px solid var(--border);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-50);
          flex-wrap: wrap;
          gap: 8px;
        }
        .l-footer-links { display: flex; gap: 16px; }
        .l-footer-links a { color: var(--accent); transition: opacity 0.2s; }
        .l-footer-links a:hover { opacity: 0.7; }

        /* scroll hint */
        .l-scroll-hint {
          position: absolute;
          bottom: 48px;
          right: clamp(20px,5vw,64px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .l-scroll-line {
          width: 1px;
          height: 48px;
          background: var(--ink);
          animation: scrollLine 1.8s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .l-scroll-hint span {
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-50);
          writing-mode: vertical-rl;
        }

        /* ── RESPONSIVE ─────────────────────────── */
        @media (max-width: 900px) {
          .l-center {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .l-center-left { max-width: 100%; }
          .l-btns { justify-content: center; }
          .l-center-right {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            max-width: 100%;
          }
          .l-stat { align-items: center; }
          .l-scroll-hint { display: none; }
          .l-footer { justify-content: center; text-align: center; }
          .l-name-top, .l-name-bot {
            font-size: clamp(56px, 16vw, 120px);
          }
        }
      `}</style>
    </section>
  );
};

export default Landing;