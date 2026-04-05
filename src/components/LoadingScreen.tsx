import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const loaderText = loaderTextRef.current!;
    const progressFill = progressFillRef.current!;
    if (!canvas || !loaderText || !progressFill) return;

    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const W = canvas.width;
    const H = canvas.height;

    const colors = [
      "#FF2080",
      "#FFB3D4",
      "#FF6BAE",
      "#E0006F",
      "#FFD6E8",
      "#FF4499",
      "#FF80BA",
      "#FF1F7A",
    ];

    function samplePoints(count: number) {
      // Match offscreen canvas aspect ratio to screen so letters are never distorted
      const SH = 600;
      const SW = Math.round(SH * (W / H));
      const off = document.createElement("canvas");
      off.width = SW;
      off.height = SH;
      const o = off.getContext("2d")!;
      const fontSize = Math.min(SH * 0.58, SW * 0.4);
      o.fillStyle = "#000";
      o.font = `bold ${fontSize}px Georgia, 'Times New Roman', serif`;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText("DG", SW / 2, SH / 2);

      const data = o.getImageData(0, 0, SW, SH).data;
      const filled: { x: number; y: number }[] = [];
      const step = 2;
      for (let y = 0; y < SH; y += step) {
        for (let x = 0; x < SW; x += step) {
          if (data[(y * SW + x) * 4 + 3] > 80) filled.push({ x, y });
        }
      }
      for (let i = filled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filled[i], filled[j]] = [filled[j], filled[i]];
      }
      // Uniform scale — aspect ratios match so X and Y scale identically
      const scale = W / SW;
      return filled.slice(0, count).map((p) => ({
        x: p.x * scale,
        y: p.y * scale,
      }));
    }

    function petalPath(
      x: number,
      y: number,
      w: number,
      h: number,
      angle: number,
    ) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -h / 2);
      ctx.bezierCurveTo(w * 0.5, -h * 0.25, w * 0.5, h * 0.25, 0, h / 2);
      ctx.bezierCurveTo(-w * 0.5, h * 0.25, -w * 0.5, -h * 0.25, 0, -h / 2);
      ctx.closePath();
      ctx.restore();
    }

    const targets = samplePoints(1000);

    const petals = targets.map((t) => {
      const edge = Math.floor(Math.random() * 4);
      let sx = 0,
        sy = 0;
      if (edge === 0) {
        sx = Math.random() * W;
        sy = -50;
      } else if (edge === 1) {
        sx = W + 50;
        sy = Math.random() * H;
      } else if (edge === 2) {
        sx = Math.random() * W;
        sy = H + 50;
      } else {
        sx = -50;
        sy = Math.random() * H;
      }
      return {
        x: sx,
        y: sy,
        tx: t.x,
        ty: t.y,
        color: colors[Math.floor(Math.random() * colors.length)],
        w: 7,
        h: 11,
        angle: Math.random() * Math.PI * 2,
        delay: Math.random() * 1400,
        alpha: 0,
        sx2: 0,
        sy2: 0,
      };
    });

    let startTime: number | null = null;
    const GATHER = 2200,
      HOLD = 1000,
      SCATTER = 900;
    let phase = "gathering";
    let rafId: number;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function easeIn(t: number) {
      return t * t * t;
    }

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      ctx.clearRect(0, 0, W, H);

      if (phase === "gathering") {
        const prog = Math.min(elapsed / GATHER, 1);
        progressFill.style.width = prog * 72 + "%";

        petals.forEach((p) => {
          const pe = elapsed - p.delay;
          if (pe < 0) return;
          const t = Math.min(pe / (GATHER * 0.65), 1);
          const et = easeOut(t);
          p.x += (p.tx - p.x) * (0.03 + et * 0.04);
          p.y += (p.ty - p.y) * (0.03 + et * 0.04);
          p.alpha = Math.min(p.alpha + 0.04, 0.9);
          p.angle += 0.05 * (1 - et * 0.95);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          petalPath(p.x, p.y, p.w, p.h, p.angle);
          ctx.fill();
        });

        if (prog >= 1) {
          phase = "holding";
          startTime = ts;
          loaderText.style.opacity = "1";
          progressFill.style.width = "86%";
        }
      } else if (phase === "holding") {
        const t = (ts - startTime) / HOLD;
        petals.forEach((p) => {
          p.x += (p.tx - p.x) * 0.15;
          p.y += (p.ty - p.y) * 0.15;
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = p.color;
          petalPath(p.x, p.y, p.w, p.h, p.angle);
          ctx.fill();
        });
        progressFill.style.width = 86 + t * 14 + "%";

        if (t >= 1) {
          phase = "scattering";
          startTime = ts;
          loaderText.style.opacity = "0";
          petals.forEach((p) => {
            const ang = Math.random() * Math.PI * 2;
            const dist = 300 + Math.random() * 400;
            p.sx2 = p.x + Math.cos(ang) * dist;
            p.sy2 = p.y + Math.sin(ang) * dist;
          });
        }
      } else if (phase === "scattering") {
        const t = Math.min((ts - startTime) / SCATTER, 1);
        const et = easeIn(t);
        progressFill.style.width = "100%";

        petals.forEach((p) => {
          p.x += (p.sx2 - p.x) * 0.06;
          p.y += (p.sy2 - p.y) * 0.06;
          p.angle += 0.1;
          ctx.globalAlpha = Math.max(0.9 - et * 0.95, 0);
          ctx.fillStyle = p.color;
          petalPath(p.x, p.y, p.w, p.h, p.angle);
          ctx.fill();
        });

        if (t >= 1) {
          ctx.globalAlpha = 1;
          setHidden(true);
          onComplete?.();
          return;
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FFF5F9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        ref={loaderTextRef}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          opacity: 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(80px, 18vw, 140px)",
            fontWeight: 700,
            color: "#FF1F7A",
            lineHeight: 1,
            letterSpacing: "-4px",
          }}
        >
          D<em style={{ fontStyle: "italic", color: "#E0006F" }}>G</em>
        </div>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#6B2045",
            textTransform: "uppercase",
            marginTop: "10px",
          }}
        >
          Loading portfolio
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "1.5px",
          background: "#FFD6E8",
          zIndex: 2,
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: "100%",
            width: "0%",
            background: "#FF1F7A",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
