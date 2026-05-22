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

import OptimizedImage from '@/components/OptimizedImage.vue'

defineProps<{
  eyebrow?: string
  title?: string
  intro?: string
  rooms: Room[]
}>()
</script>

<template>
  <section class="ap-section ap-rooms">
    <div class="ap-container">
      <div class="ap-section-head">
        <span v-if="eyebrow" class="ap-eyebrow">{{ eyebrow }}</span>
        <h2>{{ title || 'Where you’ll stay' }}</h2>
        <p v-if="intro" style="color: var(--ap-ink-muted)">{{ intro }}</p>
      </div>

      <div class="ap-rooms__list">
        <article v-for="(r, i) in rooms" :key="r.name" class="ap-rooms__row" :class="{ 'is-flip': i % 2 === 1 }">
          <div class="ap-rooms__media">
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
                <small>From</small>
                <strong>{{ r.rateFrom }}</strong>
              </span>
              <a v-if="r.bookUrl" :href="r.bookUrl" class="ap-btn">Reserve</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ap-rooms__list { display: grid; gap: clamp(2rem, 4vw, 3.5rem); }
.ap-rooms__row {
  display: grid; gap: clamp(1.5rem, 3vw, 2.5rem);
  grid-template-columns: 6fr 5fr; align-items: center;
}
.ap-rooms__row.is-flip { grid-template-columns: 5fr 6fr; }
.ap-rooms__row.is-flip .ap-rooms__media { order: 2; }
.ap-rooms__media img {
  width: 100%; aspect-ratio: 4 / 3; object-fit: cover;
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
  .ap-rooms__row, .ap-rooms__row.is-flip { grid-template-columns: 1fr; }
  .ap-rooms__row.is-flip .ap-rooms__media { order: -1; }
}
</style>
