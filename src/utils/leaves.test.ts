/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeaf, initLeaves, updateLeaf, type LeafParticle } from './leaves.ts';

test('createLeaf creates delicate smaller particles under 18px', () => {
  const leaf = createLeaf(1, 1440, 900, false);
  assert.equal(leaf.id, 1);
  assert.ok(leaf.size >= 3 && leaf.size <= 18, `Leaf size ${leaf.size} should be smaller and delicate`);
  assert.ok(leaf.speedY > 0);
  assert.ok(leaf.opacity > 0 && leaf.opacity <= 1);
});

test('createLeaf with startAtTop positions y above canvas', () => {
  const leaf = createLeaf(2, 1440, 900, true);
  assert.ok(leaf.y < 0);
});

test('initLeaves generates the requested count of leaves', () => {
  const leaves = initLeaves(25, 1440, 900);
  assert.equal(leaves.length, 25);
});

test('updateLeaf moves particle downward and updates sway with 0 scroll', () => {
  const initial = createLeaf(1, 1000, 1000, false);
  initial.y = 100;
  initial.speedY = 0.5;

  const updated = updateLeaf(initial, 16.6, 1000, 1000, 0);
  assert.ok(updated.y > initial.y, 'y should increase as leaf falls downward');
  assert.notEqual(updated.swayPhase, initial.swayPhase);
});

test('updateLeaf accelerates downward when user scrolls down', () => {
  const leaf = createLeaf(1, 1000, 1000, false);
  leaf.y = 100;

  const noScroll = updateLeaf(leaf, 16.6, 1000, 1000, 0);
  const withScroll = updateLeaf(leaf, 16.6, 1000, 1000, 10); // scrolling down with velocity 10

  assert.ok(withScroll.y > noScroll.y, 'Down scroll should accelerate leaf downward fall');
});

test('updateLeaf slows down or lifts when user scrolls up', () => {
  const leaf = createLeaf(1, 1000, 1000, false);
  leaf.y = 100;

  const noScroll = updateLeaf(leaf, 16.6, 1000, 1000, 0);
  const scrollUp = updateLeaf(leaf, 16.6, 1000, 1000, -8); // scrolling up

  assert.ok(scrollUp.y < noScroll.y, 'Upward scroll should provide aerodynamic lift');
});

test('updateLeaf resets particle at top when it falls past canvasHeight', () => {
  const leaf = createLeaf(5, 1000, 500, false);
  leaf.y = 540;

  const updated = updateLeaf(leaf, 16.6, 1000, 500, 0);
  assert.ok(updated.y < 0, 'Leaf should respawn above canvas when past bottom');
});
