import { useEffect, useState, useCallback } from "react";

const GREETING = "Hi, I'm Srijita Biswas. Welcome to my portfolio! I'm a creative developer and designer passionate about building intuitive and high-performance digital experiences. Feel free to explore my projects and journey. I'm glad you're here.";

type Mouth = "closed" | "small" | "mid";

export default function HeroAvatar() {
  const [mouth, setMouth]     = useState<Mouth>("closed");
  const [speaking, setSpeaking] = useState(false);
  const [hovered, setHovered]   = useState(false);

  /* ── Speech ── */
  const speak = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(GREETING);
    utter.rate  = 0.84;
    utter.pitch = 1.05;
    utter.volume = 1;

    const voices  = window.speechSynthesis.getVoices();
    const pick    = ["Google UK English Female","Samantha","Microsoft Zira","Karen","Moira","Tessa"];
    for (const name of pick) {
      const v = voices.find(v => v.name.includes(name));
      if (v) { utter.voice = v; break; }
    }

    setSpeaking(true);
    const shapes: Mouth[] = ["small","mid","small","closed","mid","small","mid","closed"];
    let idx = 0;
    let iv: number;

    utter.onstart    = () => { iv = window.setInterval(() => { setMouth(shapes[idx++ % shapes.length]); }, 90); };
    utter.onboundary = () => { setMouth("mid"); setTimeout(() => setMouth("small"), 75); };
    utter.onend      = () => { clearInterval(iv); setSpeaking(false); setMouth("closed"); };
    utter.onerror    = () => { clearInterval(iv); setSpeaking(false); setMouth("closed"); };

    window.speechSynthesis.speak(utter);
  }, []);

  useEffect(() => {
    const init = () => setTimeout(speak, 1000);
    if (window.speechSynthesis.getVoices().length > 0) { init(); }
    else { window.speechSynthesis.onvoiceschanged = init; }
    return () => { window.speechSynthesis?.cancel(); };
  }, [speak]);

  return (
    <div
      className="ha-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ha-container">
        {/* ── THE ACTUAL ILLUSTRATION IMAGE ── */}
        <img
          src="/images/avatar.png"
          alt="Srijita Biswas"
          className={`ha-img${hovered ? " ha-img-hov" : ""}`}
          draggable={false}
        />


        {/* ── SPEAKING DOTS ── */}
        {speaking && (
          <div className="ha-dots">
            <span className="ha-d1"/><span className="ha-d2"/><span className="ha-d3"/>
          </div>
        )}
      </div>

      {/* ── REPLAY BUTTON ── */}
      {!speaking && (
        <button className="ha-replay" onClick={speak}>
          🔊 Replay greeting
        </button>
      )}

      <style>{`
        .ha-wrap {
          width: 100%;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        /* Container matches the image aspect ratio (adjust if your image differs) */
        .ha-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 18px;
          overflow: hidden;
        }

        .ha-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center top;
          display: block;
          animation: haFloat 4.5s ease-in-out infinite;
          transition: transform 0.4s ease, filter 0.4s ease;
          filter: drop-shadow(0 20px 60px rgba(139,92,246,0.16));
          user-select: none;
        }
        .ha-img-hov {
    transform: translateY(-2px) rotate(-1deg);
    filter: drop-shadow(0 26px 72px rgba(139,92,246,.22));
}
        @keyframes haFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }

        /*
          ── MOUTH POSITIONING ──────────────────────────────────────────────
          Adjust these 4 values so the overlay lines up with the mouth
          in your specific image.

          left   = horizontal start of mouth as % of image width
          top    = vertical start of mouth as % of image height
          width  = mouth width as % of image width
          height = mouth height as % of image height

          Current values are set for the provided illustration.
          If the overlay is off, tweak left/top/width/height until it aligns.
          ────────────────────────────────────────────────────────────────── */
        .ha-mouth {
          position: absolute;
          left:   35%;
          top:    42%;
          width:  24%;
          height: 9%;
          pointer-events: none;
        }
        .ha-mouth-svg {
          width: 100%;
          height: 100%;
        }

        /* Speaking dots */
        .ha-dots {
          position: absolute;
          top: 6%;
          right: 6%;
          display: flex;
          gap: 5px;
          align-items: center;
        }
        .ha-dots span {
          display: block;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #8B5CF6;
        }
        .ha-d1 { animation: haDot 0.55s ease-in-out infinite; }
        .ha-d2 { animation: haDot 0.55s ease-in-out 0.18s infinite; }
        .ha-d3 { animation: haDot 0.55s ease-in-out 0.36s infinite; }
        @keyframes haDot {
          0%,100% { transform:scale(1); opacity:.7; }
          50%     { transform:scale(1.5); opacity:1; }
        }

        /* Replay button */
        .ha-replay {
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.28);
          color: rgba(255,255,255,0.55);
          padding: 9px 22px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font, sans-serif);
          letter-spacing: 0.04em;
        }
        .ha-replay:hover {
          background: rgba(139,92,246,0.22);
          border-color: #8B5CF6;
          color: #fff;
          transform: translateY(-1px);
        }

        @media(max-width:900px) {
          .ha-wrap { max-width: 400px; }
        }
        @media(max-width:480px) {
          .ha-wrap { max-width: 300px; }
        }
      `}</style>
    </div>
  );
}