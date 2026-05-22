<script setup lang="ts">
import { BedDouble, Wifi, Coffee, Car, Utensils, TreePine, Bath, Tv, Star, Wind } from 'lucide-vue-next'

const iconMap: Record<string, unknown> = {
  BedDouble, Wifi, Coffee, Car, Utensils, TreePine, Bath, Tv, Star, Wind
}

interface Amenity { label: string; description?: string; icon?: string }

defineProps<{
  eyebrow?: string
  title?: string
  amenities: Amenity[]
}>()
</script>

<!--
  5 distinct amenity layouts driven by data-site-style on <html>.
  All layouts work with all themes; each theme adds polish via overrides.
    1 · Ledger   — numbered editorial grid, sparse mono labels
    2 · Mosaic   — asymmetric magazine grid; feature tile + small tiles
    3 · Index    — vertical chapter list with large numbered markers and rules
    4 · Marquee  — horizontal scroll-snap track of icon pills
    5 · Medallion — radial grid of circular icon medallions on a tinted band
-->
<template>
  <section class="ap-section ap-section--alt ap-amenities">
    <div class="ap-container">
      <div class="ap-section-head">
        <span v-if="eyebrow" class="ap-eyebrow">{{ eyebrow }}</span>
        <h2>{{ title || 'Everything you need' }}</h2>
      </div>

      <!-- ── Style 1 · Ledger ── -->
      <ul class="ap-amenities__ledger">
        <li v-for="(a, i) in amenities" :key="a.label" class="ap-amenities__ledger-item">
          <span class="ap-amenities__ledger-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <strong>{{ a.label }}</strong>
            <p v-if="a.description">{{ a.description }}</p>
          </div>
        </li>
      </ul>

      <!-- ── Style 2 · Mosaic ── -->
      <ul class="ap-amenities__mosaic">
        <li
          v-for="(a, i) in amenities"
          :key="a.label"
          class="ap-amenities__mosaic-cell"
          :class="{ 'ap-amenities__mosaic-cell--feature': i === 0 }"
        >
          <div class="ap-amenities__mosaic-icon">
            <component :is="(iconMap[a.icon ?? ''] as unknown) ?? Star" :size="i === 0 ? 40 : 22" />
          </div>
          <div class="ap-amenities__mosaic-body">
            <strong>{{ a.label }}</strong>
            <p v-if="a.description">{{ a.description }}</p>
          </div>
        </li>
      </ul>

      <!-- ── Style 3 · Index ── -->
      <ol class="ap-amenities__index">
        <li v-for="(a, i) in amenities" :key="a.label" class="ap-amenities__index-row">
          <span class="ap-amenities__index-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="ap-amenities__index-icon">
            <component :is="(iconMap[a.icon ?? ''] as unknown) ?? Star" :size="20" />
          </span>
          <div class="ap-amenities__index-body">
            <strong>{{ a.label }}</strong>
            <p v-if="a.description">{{ a.description }}</p>
          </div>
        </li>
      </ol>

      <!-- ── Style 4 · Marquee ── -->
      <div class="ap-amenities__marquee">
        <ul class="ap-amenities__marquee-track">
          <li v-for="a in amenities" :key="a.label" class="ap-amenities__pill">
            <span class="ap-amenities__pill-icon">
              <component :is="(iconMap[a.icon ?? ''] as unknown) ?? Star" :size="20" />
            </span>
            <div class="ap-amenities__pill-text">
              <strong>{{ a.label }}</strong>
              <p v-if="a.description">{{ a.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- ── Style 5 · Medallion ── -->
      <ul class="ap-amenities__medallions">
        <li v-for="(a, i) in amenities" :key="a.label" class="ap-amenities__medallion" :class="`ap-amenities__medallion--${(i % 3) + 1}`">
          <span class="ap-amenities__medallion-disc" aria-hidden="true">
            <component :is="(iconMap[a.icon ?? ''] as unknown) ?? Star" :size="28" />
          </span>
          <strong>{{ a.label }}</strong>
          <p v-if="a.description">{{ a.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Visibility gating — only one variant renders at a time */
.ap-amenities__ledger,
.ap-amenities__mosaic,
.ap-amenities__index,
.ap-amenities__marquee,
.ap-amenities__medallions { display: none; }

/* ══════════════════════════════════════════════════════════
   Style 1 · LEDGER — numbered editorial grid
   ══════════════════════════════════════════════════════════ */
[data-site-style='1'] .ap-amenities__ledger {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  list-style: none; padding: 0; margin: clamp(2rem, 4vw, 3.5rem) 0 0;
  border-top: 1px solid var(--ap-line);
}
.ap-amenities__ledger-item {
  display: flex; gap: 1rem; align-items: flex-start;
  padding: clamp(1rem, 2vw, 1.75rem) clamp(0.75rem, 1.5vw, 1.25rem);
  border-right: 1px solid var(--ap-line);
  border-bottom: 1px solid var(--ap-line);
}
.ap-amenities__ledger-num {
  font-family: var(--ap-font-mono); font-size: 0.68rem;
  letter-spacing: 0.2em; color: var(--ap-ink-muted);
  padding-top: 3px; flex-shrink: 0;
}
.ap-amenities__ledger-item strong {
  display: block; font-family: var(--ap-font-heading); font-size: 0.95rem;
  letter-spacing: var(--ap-tracking-heading);
  text-transform: var(--ap-heading-transform);
}
.ap-amenities__ledger-item p { margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--ap-ink-muted); }
[data-theme='studio'] .ap-amenities__ledger-item strong {
  font-family: var(--ap-font-mono); font-size: 0.82rem; text-transform: uppercase;
}
[data-theme='vibrant'] .ap-amenities__ledger-num {
  background: var(--ap-accent); color: var(--ap-ink);
  padding: 0.15rem 0.45rem; font-weight: 700;
}
[data-theme='vibrant'] .ap-amenities__ledger-item {
  border-color: var(--ap-ink); border-right-width: 2px; border-bottom-width: 2px;
}
[data-site-style='1'][data-theme='vibrant'] .ap-amenities__ledger { border-top: 2px solid var(--ap-ink); }
@media (max-width: 640px) {
  .ap-amenities__ledger-item { border-right: none; }
}

/* ══════════════════════════════════════════════════════════
   Style 2 · MOSAIC — asymmetric brick grid with a feature tile
   ══════════════════════════════════════════════════════════ */
[data-site-style='2'] .ap-amenities__mosaic {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(140px, auto);
  grid-auto-flow: dense;
  gap: clamp(0.85rem, 1.75vw, 1.25rem);
  list-style: none; padding: 0; margin: 0;
}
.ap-amenities__mosaic-cell {
  background: var(--ap-surface);
  border: 1px solid var(--ap-line);
  border-radius: var(--ap-radius);
  padding: clamp(1rem, 2vw, 1.4rem);
  display: flex; flex-direction: column; gap: 0.55rem;
  position: relative; overflow: hidden;
}
.ap-amenities__mosaic-cell--feature {
  grid-column: span 2; grid-row: span 2;
  background: var(--ap-primary); color: var(--ap-on-primary);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  justify-content: flex-end;
}
.ap-amenities__mosaic-cell--feature .ap-amenities__mosaic-body p { color: color-mix(in srgb, var(--ap-on-primary) 80%, transparent); }
.ap-amenities__mosaic-icon {
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  color: var(--ap-primary);
}
.ap-amenities__mosaic-cell--feature .ap-amenities__mosaic-icon {
  width: 60px; height: 60px;
  color: var(--ap-on-primary);
  margin-bottom: auto;
}
.ap-amenities__mosaic-body strong {
  display: block; font-family: var(--ap-font-heading);
  font-size: 1rem; letter-spacing: var(--ap-tracking-heading);
  text-transform: var(--ap-heading-transform);
}
.ap-amenities__mosaic-cell--feature .ap-amenities__mosaic-body strong { font-size: clamp(1.4rem, 2.5vw, 2rem); }
.ap-amenities__mosaic-body p { margin: 0.3rem 0 0; font-size: 0.85rem; color: var(--ap-ink-muted); line-height: 1.5; }
[data-theme='studio'] .ap-amenities__mosaic-cell { border-radius: 0; }
[data-theme='studio'] .ap-amenities__mosaic-cell--feature { background: var(--ap-ink); color: var(--ap-surface); }
[data-theme='studio'] .ap-amenities__mosaic-cell--feature .ap-amenities__mosaic-icon { color: var(--ap-surface); }
[data-theme='vibrant'] .ap-amenities__mosaic-cell {
  border: 2.5px solid var(--ap-ink); border-radius: 14px;
  box-shadow: 4px 4px 0 var(--ap-ink);
}
[data-theme='vibrant'] .ap-amenities__mosaic-cell--feature {
  background: var(--ap-accent); color: var(--ap-ink);
}
[data-theme='vibrant'] .ap-amenities__mosaic-cell--feature .ap-amenities__mosaic-icon { color: var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__mosaic-cell--feature .ap-amenities__mosaic-body p { color: var(--ap-ink); }
@media (max-width: 720px) {
  [data-site-style='2'] .ap-amenities__mosaic { grid-template-columns: repeat(2, 1fr); }
  .ap-amenities__mosaic-cell--feature { grid-column: span 2; grid-row: span 1; }
}

/* ══════════════════════════════════════════════════════════
   Style 3 · INDEX — vertical chapter list with rules + numbers
   ══════════════════════════════════════════════════════════ */
[data-site-style='3'] .ap-amenities__index {
  display: flex; flex-direction: column;
  list-style: none; padding: 0; margin: clamp(2rem, 4vw, 3rem) 0 0;
  max-width: 880px;
  border-top: 2px solid var(--ap-ink);
}
.ap-amenities__index-row {
  display: grid;
  grid-template-columns: clamp(60px, 8vw, 90px) 42px 1fr;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  align-items: center;
  padding: clamp(1rem, 2vw, 1.5rem) 0;
  border-bottom: 1px solid var(--ap-line);
  transition: padding-left 200ms ease, background 200ms ease;
}
.ap-amenities__index-row:hover {
  padding-left: 0.75rem;
  background: color-mix(in srgb, var(--ap-primary) 5%, transparent);
}
.ap-amenities__index-num {
  font-family: var(--ap-font-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1;
  color: color-mix(in srgb, var(--ap-ink) 28%, transparent);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.ap-amenities__index-icon {
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--ap-line); border-radius: 50%;
  color: var(--ap-primary);
  flex-shrink: 0;
}
.ap-amenities__index-body strong {
  display: block; font-family: var(--ap-font-heading);
  font-size: 1.05rem; letter-spacing: var(--ap-tracking-heading);
  text-transform: var(--ap-heading-transform);
}
.ap-amenities__index-body p { margin: 0.2rem 0 0; font-size: 0.9rem; color: var(--ap-ink-muted); line-height: 1.55; }
[data-theme='studio'] .ap-amenities__index-icon { border-radius: 0; }
[data-theme='studio'] .ap-amenities__index-num { font-family: var(--ap-font-mono); font-size: clamp(1rem, 2vw, 1.4rem); }
[data-theme='vibrant'] .ap-amenities__index { border-top: 4px solid var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__index-row { border-bottom: 2px solid var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__index-num { color: var(--ap-accent); -webkit-text-stroke: 1px var(--ap-ink); font-size: clamp(2.5rem, 5vw, 3.5rem); }
[data-theme='vibrant'] .ap-amenities__index-icon { border: 2px solid var(--ap-ink); background: var(--ap-accent); color: var(--ap-ink); }

/* ══════════════════════════════════════════════════════════
   Style 4 · MARQUEE — horizontal scroll-snap pill track
   ══════════════════════════════════════════════════════════ */
[data-site-style='4'] .ap-amenities__marquee {
  display: block;
  margin: clamp(2rem, 4vw, 3rem) 0 0;
  /* Bleed to viewport edge — visually emphasizes scrollability */
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 0 clamp(1rem, 5vw, 4rem);
}
.ap-amenities__marquee-track {
  list-style: none; padding: 0.5rem 0 1.25rem; margin: 0;
  display: flex; gap: clamp(0.85rem, 1.75vw, 1.25rem);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}
.ap-amenities__pill {
  flex: 0 0 clamp(220px, 32vw, 320px);
  scroll-snap-align: start;
  background: var(--ap-surface);
  border: 1px solid var(--ap-line);
  border-radius: 999px;
  padding: 0.85rem 1.25rem 0.85rem 0.85rem;
  display: flex; align-items: center; gap: 0.85rem;
}
.ap-amenities__pill-icon {
  width: 44px; height: 44px; flex-shrink: 0;
  background: var(--ap-primary); color: var(--ap-on-primary);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.ap-amenities__pill-text strong {
  display: block; font-family: var(--ap-font-heading);
  font-size: 0.95rem; letter-spacing: var(--ap-tracking-heading);
  text-transform: var(--ap-heading-transform);
}
.ap-amenities__pill-text p {
  margin: 0.1rem 0 0; font-size: 0.78rem; color: var(--ap-ink-muted);
  line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
[data-theme='studio'] .ap-amenities__pill { border-radius: 0; }
[data-theme='studio'] .ap-amenities__pill-icon { border-radius: 0; background: var(--ap-ink); color: var(--ap-surface); }
[data-theme='vibrant'] .ap-amenities__pill {
  border: 2.5px solid var(--ap-ink); box-shadow: 4px 4px 0 var(--ap-ink);
}
[data-theme='vibrant'] .ap-amenities__pill-icon { background: var(--ap-accent); color: var(--ap-ink); border: 2px solid var(--ap-ink); }

/* ══════════════════════════════════════════════════════════
   Style 5 · MEDALLION — radial grid of icon discs on tinted band
   ══════════════════════════════════════════════════════════ */
[data-site-style='5'] .ap-amenities__medallions {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.5rem);
  list-style: none; padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
  margin: clamp(2rem, 4vw, 3rem) 0 0;
  background: color-mix(in srgb, var(--ap-primary) 6%, var(--ap-surface));
  border-radius: var(--ap-radius-lg, var(--ap-radius));
}
.ap-amenities__medallion {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 0.5rem;
}
.ap-amenities__medallion-disc {
  width: 72px; height: 72px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 0.35rem;
  background: var(--ap-surface);
  border: 1px solid var(--ap-line);
  color: var(--ap-primary);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.ap-amenities__medallion:hover .ap-amenities__medallion-disc {
  transform: scale(1.08);
  box-shadow: 0 6px 24px -8px color-mix(in srgb, var(--ap-primary) 50%, transparent);
}
/* Color-rotate discs for a playful pinwheel */
.ap-amenities__medallion--1 .ap-amenities__medallion-disc { background: var(--ap-primary); color: var(--ap-on-primary); border-color: var(--ap-primary); }
.ap-amenities__medallion--2 .ap-amenities__medallion-disc { background: var(--ap-accent); color: var(--ap-ink); border-color: var(--ap-accent); }
.ap-amenities__medallion--3 .ap-amenities__medallion-disc { background: var(--ap-surface); color: var(--ap-primary); }
.ap-amenities__medallion strong {
  display: block; font-family: var(--ap-font-heading);
  font-size: 0.95rem; letter-spacing: var(--ap-tracking-heading);
  text-transform: var(--ap-heading-transform);
}
.ap-amenities__medallion p {
  margin: 0.15rem 0 0; font-size: 0.82rem; color: var(--ap-ink-muted);
  line-height: 1.4; max-width: 24ch;
}
[data-theme='studio'] [data-site-style='5'] .ap-amenities__medallions { background: var(--ap-surface-alt); border-radius: 0; }
[data-theme='studio'] .ap-amenities__medallion-disc { border-radius: 0; }
[data-theme='vibrant'] [data-site-style='5'] .ap-amenities__medallions {
  background: var(--ap-accent);
  border: 3px solid var(--ap-ink); border-radius: 16px;
  box-shadow: 6px 6px 0 var(--ap-ink);
}
[data-theme='vibrant'] .ap-amenities__medallion-disc { border: 2.5px solid var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__medallion--1 .ap-amenities__medallion-disc { background: var(--ap-ink); color: var(--ap-accent); }
[data-theme='vibrant'] .ap-amenities__medallion--2 .ap-amenities__medallion-disc { background: var(--ap-surface); color: var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__medallion--3 .ap-amenities__medallion-disc { background: var(--ap-primary); color: var(--ap-on-primary); }
[data-theme='vibrant'] .ap-amenities__medallion strong { color: var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__medallion p { color: color-mix(in srgb, var(--ap-ink) 75%, transparent); }
</style>

<style scoped>
/* Visibility gating — only one variant renders at a time */
.ap-amenities__ledger,
.ap-amenities__cards,
.ap-amenities__tiles { display: none; }

/* ── Style 1 · Ledger ───────────────────────────────────── */
[data-site-style='1'] .ap-amenities__ledger {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  list-style: none; padding: 0; margin: clamp(2rem, 4vw, 3.5rem) 0 0;
  border-top: 1px solid var(--ap-line);
}
.ap-amenities__ledger-item {
  display: flex; gap: 1rem; align-items: flex-start;
  padding: clamp(1rem, 2vw, 1.75rem) clamp(0.75rem, 1.5vw, 1.25rem);
  border-right: 1px solid var(--ap-line);
  border-bottom: 1px solid var(--ap-line);
}
.ap-amenities__ledger-num {
  font-family: var(--ap-font-mono); font-size: 0.68rem;
  letter-spacing: 0.2em; color: var(--ap-ink-muted);
  padding-top: 3px; flex-shrink: 0;
}
.ap-amenities__ledger-item strong {
  display: block; font-family: var(--ap-font-heading); font-size: 0.95rem;
  letter-spacing: var(--ap-tracking-heading);
  text-transform: var(--ap-heading-transform);
}
.ap-amenities__ledger-item p { margin: 0.25rem 0 0; font-size: 0.88rem; color: var(--ap-ink-muted); }
/* Theme polish */
[data-theme='studio'] .ap-amenities__ledger-item strong {
  font-family: var(--ap-font-mono); font-size: 0.82rem; text-transform: uppercase;
}
[data-theme='vibrant'] .ap-amenities__ledger-num {
  background: var(--ap-accent); color: var(--ap-ink);
  padding: 0.15rem 0.45rem; font-weight: 700;
}
[data-theme='vibrant'] .ap-amenities__ledger-item {
  border-color: var(--ap-ink); border-right-width: 2px; border-bottom-width: 2px;
}
[data-theme='vibrant'] [data-site-style='1'] .ap-amenities__ledger,
[data-site-style='1'][data-theme='vibrant'] .ap-amenities__ledger { border-top: 2px solid var(--ap-ink); }
@media (max-width: 640px) {
  .ap-amenities__ledger-item { border-right: none; }
}

/* ── Style 2 · Cards ─────────────────────────────────────── */
[data-site-style='2'] .ap-amenities__cards {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: clamp(1.25rem, 2.5vw, 2rem);
  list-style: none; padding: 0; margin: 0;
}
.ap-amenities__card {
  background: var(--ap-surface); border-radius: var(--ap-radius);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  display: flex; gap: 1.25rem; align-items: flex-start;
  box-shadow: 0 3px 24px -6px color-mix(in srgb, var(--ap-ink) 12%, transparent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.ap-amenities__card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 32px -8px color-mix(in srgb, var(--ap-ink) 18%, transparent);
}
.ap-amenities__card-icon {
  flex-shrink: 0; width: 48px; height: 48px;
  background: var(--ap-surface-alt); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--ap-primary);
}
.ap-amenities__card-body strong {
  display: block; font-family: var(--ap-font-heading);
  font-size: 1.05rem; margin-bottom: 0.25rem;
  letter-spacing: var(--ap-tracking-heading);
  text-transform: var(--ap-heading-transform);
}
.ap-amenities__card-body p { margin: 0; font-size: 0.9rem; color: var(--ap-ink-muted); line-height: 1.5; }
/* Theme polish */
[data-theme='studio'] .ap-amenities__card {
  border: 1px solid var(--ap-line); box-shadow: none; border-radius: 0;
}
[data-theme='studio'] .ap-amenities__card-icon { border-radius: 0; background: transparent; border: 1px solid var(--ap-line); }
[data-theme='vibrant'] .ap-amenities__card {
  border: 2.5px solid var(--ap-ink); box-shadow: 4px 4px 0 var(--ap-ink); border-radius: 12px;
}
[data-theme='vibrant'] .ap-amenities__card:hover { box-shadow: 6px 6px 0 var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__card-icon {
  background: var(--ap-accent); color: var(--ap-ink); border: 2px solid var(--ap-ink);
}

/* ── Style 3 · Tiles ─────────────────────────────────────── */
[data-site-style='3'] .ap-amenities__tiles {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: clamp(0.85rem, 1.75vw, 1.25rem);
  list-style: none; padding: 0; margin: 0;
}
.ap-amenities__tile {
  background: var(--ap-surface); border: 1px solid var(--ap-line);
  border-radius: var(--ap-radius);
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  display: flex; flex-direction: column; gap: 0.5rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.ap-amenities__tile:hover { transform: translateY(-3px); box-shadow: var(--ap-shadow-lg); }
.ap-amenities__tile-badge {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 0.25rem;
  background: var(--ap-surface-alt); color: var(--ap-primary);
}
.ap-amenities__tile-badge--b { background: var(--ap-primary); color: var(--ap-on-primary); }
.ap-amenities__tile strong {
  display: block; font-family: var(--ap-font-heading); font-size: 0.98rem;
  letter-spacing: var(--ap-tracking-heading); text-transform: var(--ap-heading-transform);
}
.ap-amenities__tile p { margin: 0; font-size: 0.87rem; color: var(--ap-ink-muted); line-height: 1.45; }
/* Theme polish */
[data-theme='studio'] .ap-amenities__tile { border-radius: 0; }
[data-theme='studio'] .ap-amenities__tile-badge { border-radius: 0; }
[data-theme='vibrant'] .ap-amenities__tile {
  border: 2.5px solid var(--ap-ink); border-radius: 16px;
  box-shadow: 4px 4px 0 var(--ap-ink);
}
[data-theme='vibrant'] .ap-amenities__tile:hover { box-shadow: 6px 6px 0 var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__tile-badge { border: 2px solid var(--ap-ink); }
[data-theme='vibrant'] .ap-amenities__tile-badge--a { background: var(--ap-accent); color: var(--ap-ink); }
</style>