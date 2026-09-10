"use client";

import { useEffect, useRef } from "react";

export default function EmberGrass() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const visibleRef = useRef(false);
  const gustRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    const height = 200;

    const resize = () => {
      const w = canvas.parentElement?.clientWidth || 800;
      if (w !== width) { width = w; canvas.width = w; canvas.height = height; }
    };
    resize();

    /* ── Colors — warm timothy grass palette ── */
    const darkColors = ["#8b4513", "#a0522d", "#7a3b10", "#6b3410"];
    const midColors = ["#c4602a", "#b85828", "#a85520", "#9a4d1c"];
    const tipColors = ["#f5c842", "#e8913a", "#f0b848", "#dfc060"];

    /* ── Cattail colors ── */
    const cattailColors = ["#5c2d0e", "#6b3410", "#7a3b10", "#4a2508"];

    /* ── Grass blade ── */
    type Blade = {
      x: number;
      h: number;
      baseW: number;
      curve: number;
      speed: number;
      phase: number;
      stiffness: number;
      baseColor: string;
      tipColor: string;
      layer: number;
      kind: "timothy" | "cattail";
      seedHeadLen: number;
      seedDroop: number;
    };

    const blades: Blade[] = [];
    const isMobile = width < 768;
    const bladeCount = Math.min(Math.floor(width / (isMobile ? 8 : 4)), isMobile ? 100 : 200);

    for (let i = 0; i < bladeCount; i++) {
      const layerR = Math.random();
      const layer = layerR < 0.3 ? 0 : layerR < 0.7 ? 1 : 2;
      const layerScale = layer === 0 ? 0.55 : layer === 1 ? 0.8 : 1;

      const isCattail = Math.random() > 0.7;
      const h = isCattail
        ? (70 + Math.random() * 80) * layerScale
        : (50 + Math.random() * 90) * layerScale;
      const baseW = isCattail
        ? (layer === 2 ? 2 + Math.random() * 1 : 1.2 + Math.random() * 0.8)
        : (layer === 2 ? 1.5 + Math.random() * 1 : 0.8 + Math.random() * 0.8);

      blades.push({
        x: (i / bladeCount) * width + (Math.random() - 0.5) * 6,
        h,
        baseW,
        curve: isCattail ? (Math.random() - 0.5) * 0.06 : (Math.random() - 0.5) * 0.15,
        speed: isCattail ? 0.4 + Math.random() * 0.8 : 0.6 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        stiffness: isCattail ? 0.6 + Math.random() * 0.4 : 0.4 + Math.random() * 0.6,
        baseColor: isCattail
          ? cattailColors[Math.floor(Math.random() * cattailColors.length)]
          : darkColors[Math.floor(Math.random() * darkColors.length)],
        tipColor: tipColors[Math.floor(Math.random() * tipColors.length)],
        layer,
        kind: isCattail ? "cattail" : "timothy",
        seedHeadLen: isCattail ? 10 + Math.random() * 8 : 6 + Math.random() * 5,
        seedDroop: 0.1 + Math.random() * 0.2,
      });
    }

    blades.sort((a, b) => a.layer - b.layer);

    /* ── Floating embers ── */
    type Ember = { x: number; y: number; s: number; sp: number; o: number; c: string; drift: number; life: number; maxLife: number };
    const embers: Ember[] = [];
    for (let i = 0; i < 12; i++) {
      const c = tipColors[Math.floor(Math.random() * tipColors.length)];
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        s: 0.8 + Math.random() * 1.5,
        sp: 0.2 + Math.random() * 0.4,
        o: 0.2 + Math.random() * 0.4,
        c,
        drift: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 200,
        maxLife: 180 + Math.random() * 120,
      });
    }

    let t = 0;

    const animate = () => {
      if (!visibleRef.current) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      t += 0.016;

      /* ── Wind gusts — natural variation ── */
      gustRef.current += (Math.sin(t * 0.3) * 0.5 + Math.sin(t * 0.7) * 0.3 + Math.sin(t * 1.1) * 0.2 - gustRef.current) * 0.02;
      const globalWind = gustRef.current * 0.6;

      /* ── Ground — realistic soil layers ── */
      const soilGrad = ctx.createLinearGradient(0, height - 35, 0, height);
      soilGrad.addColorStop(0, "rgba(60,30,10,0.0)");
      soilGrad.addColorStop(0.2, "rgba(60,30,10,0.4)");
      soilGrad.addColorStop(0.5, "rgba(40,20,8,0.6)");
      soilGrad.addColorStop(0.8, "rgba(25,12,5,0.8)");
      soilGrad.addColorStop(1, "rgba(15,8,3,0.9)");
      ctx.fillStyle = soilGrad;
      ctx.fillRect(0, height - 35, width, 35);

      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 80; i++) {
        const sx = Math.random() * width;
        const sy = height - 5 - Math.random() * 25;
        const sr = 0.5 + Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, 6.28);
        ctx.fillStyle = Math.random() > 0.5 ? "#5c3a1a" : "#3a2010";
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(0, height - 18);
      for (let x = 0; x <= width; x += 8) {
        ctx.lineTo(x, height - 16 - Math.sin(x * 0.05) * 2 - Math.sin(x * 0.12) * 1.5);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const baseGrad = ctx.createLinearGradient(0, height - 20, 0, height - 10);
      baseGrad.addColorStop(0, "rgba(80,40,15,0.6)");
      baseGrad.addColorStop(1, "rgba(50,25,10,0.3)");
      ctx.fillStyle = baseGrad;
      ctx.fill();

      /* ── Draw each blade — wind only ── */
      for (const b of blades) {
        const sway1 = Math.sin(t * b.speed * 0.8 + b.phase) * 0.12;
        const sway2 = Math.sin(t * b.speed * 1.3 + b.phase * 1.7) * 0.06;
        const sway3 = Math.sin(t * b.speed * 0.4 + b.phase * 0.5) * 0.08;
        const totalSway = (sway1 + sway2 + sway3 + globalWind) * b.stiffness;

        const tipX = totalSway * b.h * 0.8 + b.curve * b.h * 0.1;
        const tipY = -b.h + Math.abs(totalSway) * b.h * 0.08;

        const midX = totalSway * b.h * 0.5 + b.curve * b.h * 0.05;
        const midY = -b.h * 0.55;

        ctx.save();
        ctx.translate(b.x, height - 22);
        ctx.lineCap = "round";

        const gradient = ctx.createLinearGradient(0, 0, tipX, tipY);
        gradient.addColorStop(0, b.baseColor);
        gradient.addColorStop(0.5, midColors[Math.floor(Math.random() * midColors.length)]);
        gradient.addColorStop(1, b.tipColor);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(midX, midY, tipX, tipY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = b.baseW;
        ctx.globalAlpha = b.layer === 0 ? 0.35 : b.layer === 1 ? 0.55 : 0.75;
        ctx.stroke();

        /* Timothy seed head */
        if (b.kind === "timothy" && b.layer >= 1) {
          const sLen = b.seedHeadLen;
          const sX = tipX + totalSway * sLen * b.seedDroop + b.curve * 3;
          const sY = tipY + sLen * 0.4;

          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.quadraticCurveTo(tipX + (sX - tipX) * 0.5, tipY + (sY - tipY) * 0.3, sX, sY);
          ctx.strokeStyle = b.tipColor;
          ctx.lineWidth = b.baseW * 0.5;
          ctx.globalAlpha = b.layer === 2 ? 0.8 : 0.5;
          ctx.stroke();

          for (let s = 0; s < 3; s++) {
            const sx = tipX + (sX - tipX) * (s / 3) + (Math.random() - 0.5) * 2;
            const sy = tipY + (sY - tipY) * (s / 3);
            ctx.beginPath();
            ctx.arc(sx, sy, 0.8, 0, 6.28);
            ctx.fillStyle = b.tipColor;
            ctx.globalAlpha = 0.6;
            ctx.fill();
          }
        }

        /* Cattail seed head */
        if (b.kind === "cattail") {
          const cX = tipX;
          const cY = tipY;
          const cW = 3.5 + b.baseW;
          const cH = b.seedHeadLen;
          const headSway = totalSway * 5;

          ctx.save();
          ctx.translate(cX + headSway, cY);

          ctx.beginPath();
          ctx.ellipse(0, -cH * 0.4, cW * 0.5, cH * 0.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = b.baseColor;
          ctx.globalAlpha = b.layer === 0 ? 0.4 : b.layer === 1 ? 0.6 : 0.8;
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(-cW * 0.15, -cH * 0.4, cW * 0.15, cH * 0.35, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#a0522d";
          ctx.globalAlpha = 0.3;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(0, -cH * 0.9);
          ctx.lineTo(-1, -cH * 0.65);
          ctx.lineTo(1, -cH * 0.65);
          ctx.closePath();
          ctx.fillStyle = b.baseColor;
          ctx.globalAlpha = 0.6;
          ctx.fill();

          ctx.restore();
        }

        ctx.restore();
      }

      /* ── Floating embers ── */
      for (const e of embers) {
        e.life++;
        e.y -= e.sp;
        e.x += e.drift + Math.sin(t * 1.5 + e.x * 0.01) * 0.3;

        if (e.y < -10 || e.life > e.maxLife) {
          e.y = height + 5 + Math.random() * 20;
          e.x = Math.random() * width;
          e.life = 0;
          e.maxLife = 150 + Math.random() * 100;
        }

        const fadeIn = Math.min(e.life / 30, 1);
        const fadeOut = Math.max(1 - (e.life - e.maxLife + 40) / 40, 0);
        const alpha = e.o * fadeIn * (e.life > e.maxLife - 40 ? fadeOut : 1);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = e.c;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.s, 0, 6.28);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      style={{ height: "200px", willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
