"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface Particle {
      x: number; y: number; r: number;
      speed: number; opacity: number;
      drift: number; twinkle: number; twinkleSpeed: number;
    }

    let W = 0, H = 0;
    let particles: Particle[] = [];

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function createParticles() {
      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        speed: Math.random() * 0.35 + 0.08,
        opacity: Math.random() * 0.35 + 0.05,
        drift: (Math.random() - 0.5) * 0.25,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.018 + 0.006,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.twinkle += p.twinkleSpeed;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.twinkle));
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201,168,76,${alpha})`;
        ctx!.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    const ro = new ResizeObserver(() => { resize(); createParticles(); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
