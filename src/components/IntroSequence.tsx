"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface IntroSequenceProps {
  // Fires the instant the reveal/dissolve begins — this is the cue for the
  // real page content (e.g. Hero) to start its own entrance animation, so
  // both play together instead of the page just appearing once intro ends.
  onReveal?: () => void;
  // Fires later, once the whole overlay has fully unmounted.
  onDone?: () => void;
}

export default function IntroSequence({ onReveal, onDone }: IntroSequenceProps) {
  const [active, setActive] = useState(true);
  // Only gates the TEXT (font-dependent). The dark background layers render
  // opaque immediately — see the note in the JSX below on why that matters.
  const [textReady, setTextReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgDispRef = useRef<SVGFEDisplacementMapElement>(null);

  useLayoutEffect(() => {
    const alreadySeen = sessionStorage.getItem("bsc_intro_seen") === "1";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen || reducedMotion) {
      sessionStorage.setItem("bsc_intro_seen", "1");
      setActive(false);
      onReveal?.();
      onDone?.();
      return;
    }

    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const introOverlay = document.getElementById("intro-overlay") as HTMLDivElement;
    const introContent = document.getElementById("intro-content") as HTMLDivElement;
   
    const titleSanctum = document.getElementById("intro-title-main") as HTMLHeadingElement;
    const bloomFlash = document.getElementById("intro-bloom") as HTMLDivElement;
    const cameraStrobe = document.getElementById("intro-strobe") as HTMLDivElement;
    const streakFlare = document.getElementById("intro-streak") as HTMLDivElement;
    const ambientBg = document.getElementById("intro-ambient-bg") as HTMLDivElement;
    const vignette = document.getElementById("intro-vignette") as HTMLDivElement;
    const svgDisp = svgDispRef.current!;

    const forcePoint = {
      xPercent: 0.5,
      yPercent: 0.5,
      x: 0,
      y: 0,
      update(w: number, h: number) {
        this.x = w * this.xPercent;
        this.y = h * this.yPercent;
      },
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      forcePoint.update(width, height);
      bloomFlash.style.left = forcePoint.x + "px";
      bloomFlash.style.top = forcePoint.y + "px";
      streakFlare.style.top = forcePoint.y + "px";
    }
    window.addEventListener("resize", resize);
    resize();

    // Mobile gets a lighter particle load so this stays smooth on real phones
    const isMobile = width < 768;

    let audioCtx: AudioContext | null = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
    }

    function playFilmicVacuumSweep(duration = 1.8) {
      if (!audioCtx) return;
      try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const oscSub = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(36, now);
        osc.frequency.exponentialRampToValueAtTime(78, now + duration);

        oscSub.type = "triangle";
        oscSub.frequency.setValueAtTime(72, now);
        oscSub.frequency.exponentialRampToValueAtTime(140, now + duration);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(90, now);
        filter.frequency.exponentialRampToValueAtTime(220, now + duration);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.18, now + duration * 0.88);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        oscSub.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        oscSub.start(now);
        osc.stop(now + duration);
        oscSub.stop(now + duration);
      } catch {
        // Web Audio can throw in unsupported/blocked contexts — safe to ignore
      }
    }

    function playFilmicChimeSnap() {
      if (!audioCtx) return;
      try {
        const now = audioCtx.currentTime;

        const clickOsc = audioCtx.createOscillator();
        const clickGain = audioCtx.createGain();
        clickOsc.type = "sine";
        clickOsc.frequency.setValueAtTime(1400, now);
        clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.05);
        clickGain.gain.setValueAtTime(0.4, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        clickOsc.connect(clickGain);
        clickGain.connect(audioCtx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.05);

        const chimeFreqs = [523.25, 783.99, 1046.5, 1567.98, 2093.0];
        chimeFreqs.forEach((freq, idx) => {
          const osc = audioCtx!.createOscillator();
          const gain = audioCtx!.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq + (idx * 1.5 - 2), now);
          const peakGain = 0.12 / (idx * 0.6 + 1);
          gain.gain.setValueAtTime(peakGain, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 + idx * 0.2);
          osc.connect(gain);
          gain.connect(audioCtx!.destination);
          osc.start(now);
          osc.stop(now + 3.2);
        });

        const subOsc = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        subOsc.type = "sine";
        subOsc.frequency.setValueAtTime(52, now);
        subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.4);
        subGain.gain.setValueAtTime(0.85, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        subOsc.connect(subGain);
        subGain.connect(audioCtx.destination);
        subOsc.start(now);
        subOsc.stop(now + 1.2);
      } catch {
        // ignore
      }
    }

    interface AmbientParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      color: string;
    }

    let ambientParticles: AmbientParticle[] = [];
    const NUM_AMBIENT = isMobile ? 40 : 75;

    function createAmbientParticles() {
      ambientParticles = [];
      for (let i = 0; i < NUM_AMBIENT; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2 - 0.05,
          size: Math.random() * 1.2 + 0.4,
          alpha: Math.random() * 0.35 + 0.1,
          baseAlpha: Math.random() * 0.35 + 0.1,
          color: Math.random() > 0.4 ? "212, 175, 55" : "243, 229, 171",
        });
      }
    }
    createAmbientParticles();

    interface GlyphParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      colorRgb: string;
      alpha: number;
      initialAlpha: number;
      fractureDelay: number;
      released: boolean;
      decayRate: number;
      seed1: number;
      seed2: number;
    }

    let glyphParticles: GlyphParticle[] = [];

    function generateTypographyParticles() {
      glyphParticles = [];
      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d", { willReadFrequently: true })!;
      offCanvas.width = width;
      offCanvas.height = height;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const sanctumRect = titleSanctum.getBoundingClientRect();
      

    

      offCtx.font = `700 ${window.getComputedStyle(titleSanctum).fontSize} 'Cinzel', serif`;
      offCtx.fillStyle = "#ffffff";
      offCtx.fillText(
        titleSanctum.textContent || "",
        sanctumRect.left + sanctumRect.width / 2,
        sanctumRect.top + sanctumRect.height / 2
      );

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const step = isMobile ? 5 : Math.max(2, Math.floor(width < 768 ? 3 : 2));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          const alpha = data[idx + 3];
          if (alpha > 40) {
            const dx = x - forcePoint.x;
            const dy = y - forcePoint.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const edgeNoise = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 80;
            const fractureDelay = Math.max(0, (dist * 0.25 + edgeNoise) * 0.001);

            const rChoice = Math.random();
            let colorRgb = "212, 175, 55";
            let size = Math.random() * 1.1 + 0.4;
            if (rChoice < 0.45) {
              colorRgb = "243, 229, 171";
              size = Math.random() * 0.9 + 0.4;
            } else if (rChoice < 0.85) {
              colorRgb = "212, 175, 55";
              size = Math.random() * 1.3 + 0.5;
            } else {
              colorRgb = "255, 248, 220";
              size = Math.random() * 0.8 + 0.3;
            }

            const baseSpeed = Math.random() * 0.9 + 0.35;

            glyphParticles.push({
              x,
              y,
              vx: Math.cos(angle) * baseSpeed + (Math.random() - 0.5) * 0.3,
              vy: Math.sin(angle) * baseSpeed + (Math.random() - 0.5) * 0.3,
              size,
              colorRgb,
              alpha: 1.0,
              initialAlpha: alpha / 255,
              fractureDelay,
              released: false,
              decayRate: Math.random() * 0.0035 + 0.0022,
              seed1: Math.random() * 100,
              seed2: Math.random() * 100,
            });
          }
        }
      }
    }

    const shockwave = { active: false, radius: 0, maxRadius: 0, speed: 0, alpha: 1 };

    function getMultiFrequencyCurl(x: number, y: number, t: number, s1: number, s2: number) {
      const scale1 = 0.0022;
      const scale2 = 0.0075;
      const u1 = Math.sin(y * scale1 + t * 0.45 + s1) * 0.65;
      const v1 = Math.cos(x * scale1 - t * 0.4 + s2) * 0.65;
      const u2 = Math.cos(y * scale2 * 1.5 - t * 0.8) * 0.28;
      const v2 = Math.sin(x * scale2 * 1.5 + t * 0.75) * 0.28;
      return { u: u1 + u2, v: v1 + v2 };
    }

    function triggerFilmicOverexposure() {
      cameraStrobe.style.transition = "none";
      cameraStrobe.style.opacity = "1";
      streakFlare.style.transition = "none";
      streakFlare.style.opacity = "1";
      streakFlare.style.transform = "translateY(-50%) scaleY(1.4) scaleX(1)";

      setTimeout(() => {
        cameraStrobe.style.transition = "opacity 1.4s cubic-bezier(0.15, 0.9, 0.25, 1)";
        cameraStrobe.style.opacity = "0";
        streakFlare.style.transition =
          "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        streakFlare.style.opacity = "0";
        streakFlare.style.transform = "translateY(-50%) scaleY(0.1) scaleX(1.15)";
      }, 50);
    }

    let state: "idle" | "pre-pull" | "snapped" | "completed" = "idle";
    let animationStartTime = 0;
    let snapTimestamp = 0;
    let animationFrameId = 0;

    function finishSequence() {
      sessionStorage.setItem("bsc_intro_seen", "1");
      document.body.style.overflow = "";
      setActive(false);
      onDone?.();
    }

    function passiveLoop() {
      if (state !== "idle") return;
      ctx.clearRect(0, 0, width, height);
      for (const p of ambientParticles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(passiveLoop);
    }
    passiveLoop();

    function drawAmbientDrift() {
      for (const p of ambientParticles) {
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawAmbientInwardPull(pullIntensity: number) {
      for (const p of ambientParticles) {
        const dx = forcePoint.x - p.x;
        const dy = forcePoint.y - p.y;
        const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        const speed = pullIntensity * 3.6 * (1 + 120 / dist);
        p.x += (dx / dist) * speed;
        p.y += (dy / dist) * speed;
        const currentAlpha = Math.min(0.9, p.baseAlpha + pullIntensity * 0.4);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + pullIntensity * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function masterTransitionLoop(timestamp: number) {
      const elapsed = (timestamp - animationStartTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      if (elapsed < 0.25) {
        drawAmbientDrift();
      } else if (elapsed < 2.05) {
        const pullProgress = (elapsed - 0.25) / 1.8;
        const liquidEase = Math.sin((pullProgress * Math.PI) / 2);
        const easePull = Math.pow(pullProgress, 2.2);

        vignette.style.opacity = (0.6 + easePull * 0.38).toFixed(3);
        ambientBg.style.transform = `scale(${1 - easePull * 0.045})`;

        const pullPx = easePull * 10;
        const scaleComp = 1 - easePull * 0.04;
        introContent.style.transform = `scale(${scaleComp}) translateY(${pullPx * 0.18}px)`;

        if (easePull > 0.3) {
          const dispScale = (easePull - 0.3) * 11;
          svgDisp.setAttribute("scale", dispScale.toString());
          introOverlay.style.filter = `url(#reality-refract)`;
        }
        drawAmbientInwardPull(liquidEase);
      } else if (elapsed < 2.12) {
        introContent.style.transform = `scale(0.958) translateY(2.2px)`;
        vignette.style.opacity = "0.96";
        drawAmbientInwardPull(0.98);
      } else {
        if (state !== "snapped") {
          state = "snapped";
          snapTimestamp = timestamp;
          triggerFilmicOverexposure();
          playFilmicChimeSnap();
          introContent.style.opacity = "0";

          shockwave.active = true;
          shockwave.radius = 2;
          shockwave.maxRadius = Math.sqrt(width * width + height * height) * 0.85;
          shockwave.speed = width > 768 ? 20 : 15;
          shockwave.alpha = 0.9;

          bloomFlash.style.transition =
            "transform 0.25s cubic-bezier(0.12, 0.9, 0.25, 1), opacity 0.5s ease-out";
          bloomFlash.style.transform = `translate(-50%, -50%) scale(${Math.max(width, height) * 0.9})`;
          bloomFlash.style.opacity = "1";

          setTimeout(() => {
            bloomFlash.style.transition =
              "opacity 2.2s cubic-bezier(0.16, 1, 0.3, 1), transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)";
            bloomFlash.style.opacity = "0";
            bloomFlash.style.transform = `translate(-50%, -50%) scale(${Math.max(width, height) * 1.15})`;
          }, 180);

          // Reveals the real site (Navbar + Hero + rest) that's already
          // rendered underneath this overlay — no fake hero needed here.
          setTimeout(() => {
            introOverlay.style.display = "none";

            // Dissolve the darkness gradually instead of leaving it opaque —
            // the Hero shows through while particles are still drifting on
            // top, so the two moments read as one continuous reveal.
            ambientBg.style.transition = "opacity 2.2s ease, transform 2s ease";
            ambientBg.style.opacity = "0";
            vignette.style.transition = "opacity 2.2s ease";
            vignette.style.opacity = "0";

            // Cue the real page content to start its own entrance animation
            // right now, in sync with the dissolve — not before, not after.
            onReveal?.();
          }, 380);
        }

        const snapElapsed = (timestamp - snapTimestamp) / 1000;

        if (shockwave.active) {
          shockwave.radius += shockwave.speed;
          shockwave.alpha = Math.max(0, 1 - (shockwave.radius / shockwave.maxRadius) * 1.05);

          ctx.save();
          ctx.beginPath();
          ctx.arc(forcePoint.x, forcePoint.y, shockwave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${shockwave.alpha * 0.45})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(forcePoint.x, forcePoint.y, Math.max(0, shockwave.radius - 6), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 175, 55, ${shockwave.alpha * 0.3})`;
          ctx.lineWidth = 4.5;
          ctx.stroke();
          ctx.restore();

          const waveRefract = Math.sin((shockwave.radius / shockwave.maxRadius) * Math.PI) * 10;
          svgDisp.setAttribute("scale", waveRefract.toFixed(1));

          if (shockwave.radius >= shockwave.maxRadius || shockwave.alpha <= 0) {
            shockwave.active = false;
            svgDisp.setAttribute("scale", "0");
          }
        }

        let activeGlyphParticles = 0;
        const timeNow = timestamp * 0.001;

        for (const p of glyphParticles) {
          if (!p.released) {
            if (snapElapsed >= p.fractureDelay) {
              p.released = true;
            } else {
              const preStressProgress = snapElapsed / Math.max(0.001, p.fractureDelay);
              if (preStressProgress > 0.5) {
                ctx.fillStyle = `rgba(255, 242, 161, ${0.3 + preStressProgress * 0.5})`;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                activeGlyphParticles++;
              }
              continue;
            }
          }

          const turb = getMultiFrequencyCurl(p.x, p.y, timeNow, p.seed1, p.seed2);
          p.vx = p.vx * 0.94 + turb.u * 0.45;
          p.vy = p.vy * 0.94 + turb.v * 0.45 - 0.08;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decayRate;

          if (p.alpha > 0) {
            activeGlyphParticles++;
            ctx.fillStyle = `rgba(${p.colorRgb}, ${p.alpha * p.initialAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        for (const p of ambientParticles) {
          const dx = p.x - forcePoint.x;
          const dy = p.y - forcePoint.y;
          const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
          p.x += (dx / dist) * 1.1 + (Math.random() - 0.5) * 0.2;
          p.y += (dy / dist) * 1.1 - 0.25;
          p.alpha = Math.max(0, p.alpha - 0.005);
          if (p.alpha > 0) {
            ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (activeGlyphParticles === 0 && snapElapsed > 3.4) {
          state = "completed";
          cancelAnimationFrame(animationFrameId);
          finishSequence();
          return;
        }
      }

      animationFrameId = requestAnimationFrame(masterTransitionLoop);
    }

    function startSequence() {
      if (state !== "idle") return;
      initAudio(); // will silently stay muted without a prior user gesture — that's expected

      generateTypographyParticles();

      state = "pre-pull";
      animationStartTime = performance.now();
      playFilmicVacuumSweep(1.8);

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(masterTransitionLoop);
    }

    // Auto-run once fonts have actually finished loading — starting before
    // that risks a visible fallback-font flash right as the sequence begins.
    // A safety timeout covers browsers/edge-cases where font-loading
    // detection doesn't resolve promptly.
    let cancelled = false;
    function revealAndStart() {
      if (cancelled) return;
      cancelled = true; // guards against both the fonts.ready and safety paths firing
      setTextReady(true);
      // Small buffer so the fade-in has a clean, already-correct frame to
      // start from, instead of racing the opacity transition.
      window.setTimeout(startSequence, 150);
    }

    const fontsReadyPromise: Promise<unknown> =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve();
    fontsReadyPromise.then(revealAndStart).catch(revealAndStart);
    const safetyTimeoutId = window.setTimeout(revealAndStart, 900);

    return () => {
      window.removeEventListener("resize", resize);
      window.clearTimeout(safetyTimeoutId);
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, [onReveal, onDone]);

  if (!active) return null;

  return (
    // No opacity gating here — this must cover the real site from the very
    // first frame, or the actual Hero (video/text, which aren't hidden)
    // flashes through underneath while we wait on fonts. Only the text
    // inside waits; the darkness itself is instant.
    <div>
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="reality-refract" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency={0.025} numOctaves={3} result="noise" />
            <feDisplacementMap
              ref={svgDispRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div id="intro-ambient-bg" className="intro-ambient-bg" />
      <div id="intro-vignette" className="intro-vignette" />

      <div id="intro-overlay" className="intro-overlay">
        <div
          id="intro-content"
          className="intro-content"
          style={{ opacity: textReady ? 1 : 0 }}
        >
         
          <h1 id="intro-title-main" className="intro-sanctum-title">
            BIG STAGE CRAFTS
          </h1>
        </div>
      </div>

      <div id="intro-strobe" className="intro-strobe" />
      <div id="intro-streak" className="intro-streak" />
      <div id="intro-bloom" className="intro-bloom" />
      <canvas ref={canvasRef} className="intro-canvas" />

      <style jsx>{`
        .intro-ambient-bg {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, #151515 0%, #080808 45%, #020202 100%);
          pointer-events: none;
          z-index: 55;
          transition: filter 1.2s ease, transform 1.8s cubic-bezier(0.2, 0.8, 0.25, 1);
        }
        .intro-vignette {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.85) 100%);
          pointer-events: none;
          z-index: 56;
          opacity: 0.6;
          transition: opacity 1.8s ease;
        }
        .intro-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 60;
          padding: 2rem;
          transition: filter 0.4s ease;
        }
        .intro-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transform-origin: 50% 50%;
          will-change: transform, filter, opacity;
          transition: transform 0.1s linear, filter 0.2s ease, opacity 0.4s ease;
        }
       
        .intro-sanctum-title {
          font-family: "Cinzel", serif;
          font-size: clamp(2rem, 5vw, 4.2rem);
          letter-spacing: 0.22em;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.15;
          background: linear-gradient(135deg, #ffffff 15%, #f3e5ab 50%, #d4af37 85%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2.8rem;
        }
        .intro-init-button {
          position: relative;
          padding: 1.1rem 3.4rem;
          font-family: "Cinzel", serif;
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #eaeaea;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
          outline: none;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .intro-init-button:hover:not(:disabled) {
          border-color: rgba(212, 175, 55, 0.7);
          color: #ffffff;
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.2);
        }
        .intro-init-button:disabled {
          cursor: default;
          opacity: 0.4;
          border-color: rgba(255, 255, 255, 0.1);
        }
        .intro-strobe {
          position: fixed;
          inset: 0;
          background: radial-gradient(
            ellipse at 50% 50%,
            #ffffff 0%,
            #fffbf0 42%,
            #ffd978 78%,
            rgba(212, 175, 55, 0.85) 100%
          );
          pointer-events: none;
          z-index: 95;
          opacity: 0;
          mix-blend-mode: screen;
          will-change: opacity;
        }
        .intro-streak {
          position: fixed;
          top: 50%;
          left: 0;
          width: 100vw;
          height: 70px;
          transform: translateY(-50%) scaleY(0);
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 255, 255, 0.95) 48%,
            rgba(243, 229, 171, 1) 50%,
            rgba(212, 175, 55, 0.95) 52%,
            transparent 100%
          );
          filter: blur(5px);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 96;
          opacity: 0;
          will-change: transform, opacity;
        }
        .intro-bloom {
          position: fixed;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            #ffffff 18%,
            #fff4c2 45%,
            rgba(212, 175, 55, 0.8) 75%,
            rgba(180, 130, 20, 0) 100%
          );
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
          z-index: 90;
          opacity: 0;
          will-change: transform, opacity;
        }
        .intro-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 80;
        }
      `}</style>
    </div>
  );
}