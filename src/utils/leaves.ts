/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LeafType = 'autumn-gold' | 'travertine-amber' | 'olive-bronze';

export interface LeafParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  opacity: number;
  type: LeafType;
  depth: number; // 0.6 (distant/smaller) to 1.2 (foreground)
}

export function createLeaf(
  id: number,
  canvasWidth: number,
  canvasHeight: number,
  startAtTop: boolean = false
): LeafParticle {
  const types: LeafType[] = ['autumn-gold', 'travertine-amber', 'olive-bronze'];
  const type = types[Math.floor(Math.random() * types.length)];

  // Smaller, delicate luxury leaf size (6px to 13px)
  const depth = 0.65 + Math.random() * 0.55;
  const size = (6 + Math.random() * 7) * depth;
  const y = startAtTop ? -20 - Math.random() * 30 : Math.random() * canvasHeight;
  const x = Math.random() * (canvasWidth + 60) - 30;

  return {
    id,
    x,
    y,
    size,
    speedY: (0.45 + Math.random() * 0.7) * depth,
    speedX: (0.15 + Math.random() * 0.35) * depth,
    swayAmplitude: 10 + Math.random() * 18,
    swaySpeed: 0.0018 + Math.random() * 0.002,
    swayPhase: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.03,
    tilt: Math.random() * Math.PI,
    tiltSpeed: 0.018 + Math.random() * 0.025,
    opacity: (0.5 + Math.random() * 0.45) * Math.min(1, depth),
    type,
    depth,
  };
}

export function initLeaves(count: number, canvasWidth: number, canvasHeight: number): LeafParticle[] {
  const safeCount = Math.max(1, Math.min(count, 60));
  return Array.from({ length: safeCount }, (_, i) => createLeaf(i, canvasWidth, canvasHeight, false));
}

export function updateLeaf(
  leaf: LeafParticle,
  deltaMs: number,
  canvasWidth: number,
  canvasHeight: number,
  scrollVelocityY: number = 0
): LeafParticle {
  // Normalize delta
  const dtFactor = Math.min(3, Math.max(0.2, deltaMs / 16.6));

  // Dynamic scroll response:
  // Downward scroll accelerates fall and creates gust swirl
  // Upward scroll provides gentle aerodynamic lift
  const clampedScroll = Math.max(-15, Math.min(25, scrollVelocityY));
  const scrollInfluenceY = clampedScroll * 0.18 * leaf.depth;
  const scrollSwirl = clampedScroll * 0.04 * (leaf.id % 2 === 0 ? 1 : -1);

  const newSwayPhase = leaf.swayPhase + leaf.swaySpeed * deltaMs;
  const horizontalSway = Math.sin(newSwayPhase) * (leaf.swayAmplitude * 0.025);

  const newX = leaf.x + (leaf.speedX + horizontalSway + scrollSwirl * 1.5) * dtFactor;
  const newY = leaf.y + (leaf.speedY + scrollInfluenceY) * dtFactor;

  // Faster rotation & tumbling when scrolling
  const extraRotation = Math.abs(clampedScroll) * 0.005;
  const newRotation = leaf.rotation + (leaf.rotationSpeed + scrollSwirl * 0.02 + extraRotation) * dtFactor;
  const newTilt = leaf.tilt + (leaf.tiltSpeed + Math.abs(clampedScroll) * 0.01) * dtFactor;

  // Respawn at top if fallen past bottom or blown off right/left
  if (newY > canvasHeight + 25 || newX > canvasWidth + 40 || newX < -40) {
    return createLeaf(leaf.id, canvasWidth, canvasHeight, true);
  }

  // Respawn at bottom if lifted far above top during strong upward scroll
  if (newY < -35) {
    const respawned = createLeaf(leaf.id, canvasWidth, canvasHeight, false);
    return {
      ...respawned,
      y: canvasHeight + 15,
    };
  }

  return {
    ...leaf,
    x: newX,
    y: newY,
    swayPhase: newSwayPhase,
    rotation: newRotation,
    tilt: newTilt,
  };
}
