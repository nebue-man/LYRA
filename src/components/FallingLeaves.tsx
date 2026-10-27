/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { LeafParticle, initLeaves, updateLeaf } from '../utils/leaves.ts';
import { Wind } from 'lucide-react';

interface FallingLeavesProps {
  leafCount?: number;
}

export const FallingLeaves: React.FC<FallingLeavesProps> = ({ leafCount = 28 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const leavesRef = useRef<LeafParticle[]>([]);
  const lastTimeRef = useRef<number>(performance.now());
  const animFrameIdRef = useRef<number | null>(null);

  // Scroll tracking references
  const lastScrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollVelocityRef = useRef<number>(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsEnabled(false);
    }
  }, []);

  // Passive scroll listener to compute scroll velocity and direction
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Add to scroll velocity (positive = scrolling down, negative = scrolling up)
      // Clamped to avoid abrupt physics spikes
      scrollVelocityRef.current += Math.max(-20, Math.min(30, delta * 0.35));

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      if (leavesRef.current.length === 0) {
        leavesRef.current = initLeaves(leafCount, window.innerWidth, window.innerHeight);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Draw small refined leaf
    const drawLeaf = (leaf: LeafParticle) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      // 3D tumble simulation via vertical scale oscillation
      ctx.scale(1, Math.cos(leaf.tilt));

      ctx.globalAlpha = leaf.opacity;

      const s = leaf.size;

      // Color scheme based on leaf type
      if (leaf.type === 'autumn-gold') {
        const grad = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
        grad.addColorStop(0, '#f9df88');
        grad.addColorStop(0.5, '#d4af37');
        grad.addColorStop(1, '#a17812');
        ctx.fillStyle = grad;
        ctx.strokeStyle = 'rgba(164, 126, 27, 0.4)';
      } else if (leaf.type === 'travertine-amber') {
        const grad = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
        grad.addColorStop(0, '#eec881');
        grad.addColorStop(0.6, '#c59b27');
        grad.addColorStop(1, '#815610');
        ctx.fillStyle = grad;
        ctx.strokeStyle = 'rgba(135, 93, 20, 0.35)';
      } else {
        const grad = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
        grad.addColorStop(0, '#d1c59b');
        grad.addColorStop(0.6, '#9f8e5f');
        grad.addColorStop(1, '#5a4e2f');
        ctx.fillStyle = grad;
        ctx.strokeStyle = 'rgba(90, 78, 47, 0.35)';
      }

      // Sculptural, delicate leaf contour
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.6, -s * 0.45, s * 0.7, s * 0.45, 0, s);
      ctx.bezierCurveTo(-s * 0.7, s * 0.45, -s * 0.6, -s * 0.45, 0, -s);
      ctx.closePath();
      ctx.fill();

      // Leaf central vein line for delicacy
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.85);
      ctx.lineTo(0, s * 0.85);
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    };

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTimeRef.current = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (time: number) => {
      const deltaMs = Math.min(time - lastTimeRef.current, 100);
      lastTimeRef.current = time;

      if (isTabVisible) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        const w = window.innerWidth;
        const h = window.innerHeight;

        // Current scroll velocity influence
        const currentVel = scrollVelocityRef.current;

        // Smooth velocity decay (damping back to ambient calm)
        scrollVelocityRef.current *= 0.91;
        if (Math.abs(scrollVelocityRef.current) < 0.05) {
          scrollVelocityRef.current = 0;
        }

        leavesRef.current = leavesRef.current.map((leaf) => {
          const next = updateLeaf(leaf, deltaMs, w, h, currentVel);
          drawLeaf(next);
          return next;
        });
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isEnabled, leafCount]);

  return (
    <>
      {/* Full-screen falling leaves canvas with zero pointer interception */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-700 select-none"
        style={{ opacity: isEnabled ? 0.9 : 0 }}
      />

      {/* Discrete Ambient Breeze Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-sans uppercase tracking-[0.18em] border backdrop-blur-md transition-all cursor-pointer shadow-md ${
            isEnabled
              ? 'bg-black/70 border-amber-400/50 text-amber-300 hover:bg-black/90'
              : 'bg-black/50 border-white/15 text-neutral-400 hover:text-white hover:border-white/30'
          }`}
          title={isEnabled ? 'Pause falling leaves animation' : 'Enable falling leaves animation'}
          aria-label={isEnabled ? 'Disable ambient falling leaves animation' : 'Enable ambient falling leaves animation'}
        >
          <Wind className={`w-3.5 h-3.5 ${isEnabled ? 'animate-pulse text-amber-300' : 'text-neutral-500'}`} />
          <span className="hidden sm:inline">Autumn Breeze</span>
          <span className="font-mono text-[9px] text-neutral-400">
            {isEnabled ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>
    </>
  );
};
