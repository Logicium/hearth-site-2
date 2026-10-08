<script setup lang="ts">
interface Room {
  name: string
  blurb: string
  image: string
  imageAlt?: string
  features: string[]
  rateFrom?: string
  bookUrl?: string
}

import { RouterLink } from 'vue-router'
import OptimizedImage from '@apotome/archetype-shared/components/OptimizedImage.vue'

withDefaults(defineProps<{
  eyebrow?: string
  title?: string
  intro?: string
  rooms: Room[]
  /** Prefix before a room's nightly rate, e.g. "From $120". Owner-editable. */
  rateFromLabel?: string
  /** Booking button label on each room card. Owner-editable. */
  ctaLabel?: string
}>(), { title: 'Where you’ll stay', rateFromLabel: 'From', ctaLabel: 'Reserve' })

/** Reserve goes to the internal booking page unless the room explicitly
    points at an external system. */
function isExternal(url?: string): boolean {
  return !!url && /^https?:\/\//.test(url)
}
</script>

<template>
  <section class="ap-section ap-rooms" data-index>
    <div class="ap-container">
      <div class="ap-section-head">
        <span v-if="eyebrow" class="ap-eyebrow">{{ eyebrow }}</span>
        <h2 v-lines>{{ title }}</h2>
        <p v-if="intro" style="color: var(--ap-ink-muted)">{{ intro }}</p>
      </div>

      <div class="ap-rooms__list" v-cascade="110">
        <article v-for="(r, i) in rooms" :key="r.name" class="ap-rooms__row">
          <span class="ap-rooms__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="ap-rooms__media" v-grow>
            <OptimizedImage :src="r.image" :alt="r.imageAlt || r.name" />
          </div>
          <div class="ap-rooms__body">
            <h3>{{ r.name }}</h3>
            <p>{{ r.blurb }}</p>
            <ul class="ap-rooms__features">
              <li v-for="f in r.features" :key="f">{{ f }}</li>
            </ul>
            <div class="ap-rooms__foot">
              <span v-if="r.rateFrom" class="ap-rooms__rate">
                <small>{{ rateFromLabel }}</small>
                <strong>{{ r.rateFrom }}</strong>
              </span>
              <a v-if="isExternal(r.bookUrl)" :href="r.bookUrl" class="ap-btn" target="_blank" rel="noopener">{{ ctaLabel }}</a>
              <RouterLink v-else :to="r.bookUrl || '/book'" class="ap-btn">{{ ctaLabel }}</RouterLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* A folio, not a seesaw: every room is a numbered entry with the photo on
   the same side, so the page reads as an index rather than alternating bands. */
.ap-rooms__list { display: grid; gap: 0; border-top: 1px solid var(--ap-line); }
.ap-rooms__row {
  display: grid; gap: clamp(1.25rem, 3vw, 2.5rem);
  grid-template-columns: 3rem minmax(220px, 0.62fr) minmax(0, 1.38fr); align-items: start;
  padding: clamp(1.5rem, 3vw, 2.5rem) 0;
  border-bottom: 1px solid var(--ap-line);
}
.ap-rooms__num { font-family: var(--ap-font-mono); font-size: 0.66rem; letter-spacing: 0.2em; color: var(--ap-ink-muted); padding-top: 0.4rem; }
.ap-rooms__media img {
  width: 100%; aspect-ratio: 4 / 3; max-height: 360px; object-fit: cover;
  border-radius: var(--ap-radius-lg);
}
.ap-rooms__features {
  list-style: none; padding: 0; margin: 1rem 0; display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.4rem 1rem;
}
.ap-rooms__features li {
  font-size: 0.92rem; color: var(--ap-ink-muted);
  padding-left: 1rem; position: relative;
}
.ap-rooms__features li::before {
  content: ''; position: absolute; left: 0; top: 0.55em;
  width: 8px; height: 1px; background: var(--ap-primary);
}
.ap-rooms__foot { display: flex; align-items: center; gap: 1.25rem; margin-top: 1rem; flex-wrap: wrap; }
.ap-rooms__rate { display: flex; flex-direction: column; line-height: 1.1; }
.ap-rooms__rate small { font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ap-ink-muted); }
.ap-rooms__rate strong { font-family: var(--ap-font-heading); font-size: 1.5rem; }
@media (max-width: 820px) {
  .ap-rooms__row { grid-template-columns: 1fr; }
  .ap-rooms__num { display: none; }
}
</style>
