import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-left > *", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".about-left", start: "top 80%" },
      });
      gsap.from(".about-right > *", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".about-right", start: "top 80%" },
      });
      gsap.from(".about-photo-img", {
        scale: 0.88, opacity: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".about-photo-img", start: "top 82%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="about" id="about">
      <div className="about-inner">

        {/* LEFT — text */}
        <div className="about-left">
          <p className="about-eyebrow">About Me</p>
          <h2 className="about-h2">
            Where logic meets<br />
            <span>creativity</span>
          </h2>
          <p className="about-bio">
            I'm a Computer Science Engineering student at Sister Nivedita University,
            deeply passionate about UI/UX design and frontend development.
            I love turning ideas into structured, visually sharp digital experiences
            that actually make sense to the people using them.
          </p>
          <p className="about-bio">
            My approach blends research-driven design thinking with clean implementation —
            every pixel has a purpose, every interaction has intent.
          </p>

          <div className="about-chips">
            {["Figma", "Adobe XD", "HTML · CSS · JS", "Python", "React", "UX Research"].map(t => (
              <span key={t} className="about-chip">{t}</span>
            ))}
          </div>

          <div className="about-badges">
            <div className="about-badge">
              <strong>8.47</strong>
              <span>CGPA</span>
            </div>
            <div className="about-badge">
              <strong>05+</strong>
              <span>Projects</span>
            </div>
            <div className="about-badge">
              <strong>04</strong>
              <span>Certifications</span>
            </div>
          </div>

          <a href="#contact" className="about-cta">
            Let's work together <span>→</span>
          </a>
        </div>

        {/* RIGHT — photo + experience */}
        <div className="about-right">
          <div className="about-photo-wrap">
            {/*
              ★ Replace the placeholder div with:
              <img src="/images/photo.jpeg" alt="Srijita Biswas" className="about-photo-img" />
            */}
            <div className="about-photo-img about-photo-ph">
              <span>👤</span>
              <p>Add photo:<br/>/public/images/photo.jpeg</p>
            </div>
            <div className="about-photo-label">
              <div className="about-status-dot" />
              <span>Available for internships</span>
            </div>
          </div>

          <div className="about-exp-cards">
            <div className="about-exp-card">
              <p className="about-exp-role">Product Design Trainee</p>
              <p className="about-exp-company">Employability.life</p>
              <p className="about-exp-date">Dec 2025 – Jan 2026</p>
            </div>
            <div className="about-exp-card">
              <p className="about-exp-role">Social Media Manager</p>
              <p className="about-exp-company">Aperture Alchemist</p>
              <p className="about-exp-date">Apr 2026 – Present</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          padding: clamp(80px, 10vw, 140px) clamp(20px, 5vw, 64px);
          background: var(--white);
        }
        .about-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: start;
        }
        .about-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .about-h2 {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 28px;
        }
        .about-h2 span { color: var(--accent); }
        .about-bio {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(5,5,5,0.65);
          margin-bottom: 16px;
          font-weight: 300;
        }
        .about-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 28px 0;
        }
        .about-chip {
          padding: 7px 16px;
          border: 1.5px solid var(--border);
          border-radius: 99px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink);
          background: var(--bg);
          transition: all 0.2s ease;
        }
        .about-chip:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .about-badges {
          display: flex;
          gap: 28px;
          margin-bottom: 36px;
        }
        .about-badge {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .about-badge strong {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--ink);
        }
        .about-badge span {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-50);
        }
        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: var(--accent);
          border-bottom: 1.5px solid var(--accent);
          padding-bottom: 2px;
          transition: gap 0.2s ease;
        }
        .about-cta:hover { gap: 14px; }

        /* photo */
        .about-photo-wrap {
          position: relative;
          margin-bottom: 20px;
        }
        .about-photo-img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          object-position: top;
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(5,5,5,0.1);
          display: block;
        }
        .about-photo-ph {
          display: flex !important;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg,#d4e8f8,#b8d4ef);
          gap: 12px;
          text-align: center;
          padding: 20px;
        }
        .about-photo-ph span { font-size: 48px; opacity: 0.4; }
        .about-photo-ph p { font-size: 11px; color: rgba(5,5,5,0.4); font-family: monospace; line-height:1.6; }
        .about-photo-label {
          position: absolute;
          bottom: 16px; left: 16px; right: 16px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
        }
        .about-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: pulse 2s ease infinite;
        }

        /* exp cards */
        .about-exp-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .about-exp-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 22px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .about-exp-card:hover {
          border-color: var(--accent);
          transform: translateX(4px);
        }
        .about-exp-role {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .about-exp-company {
          font-size: 13px;
          font-weight: 500;
          color: var(--accent);
          margin-bottom: 4px;
        }
        .about-exp-date {
          font-size: 11px;
          color: var(--ink-50);
          font-weight: 400;
        }

        @media (max-width: 860px) {
          .about-inner { grid-template-columns: 1fr; }
          .about-right { order: -1; }
          .about-photo-img { aspect-ratio: 4/3; }
        }
      `}</style>
    </section>
  );
};

export default About;