<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '../config/site.config'
import { VARIANT_PHOTO_COUNT, resolveVariant, variantAtLeast } from '@apotome/archetype-shared/themes/tokens'
import { useSiteContentStore } from '@apotome/archetype-shared/platform/siteContentStore'
import { useSiteTheme } from '@apotome/archetype-shared/composables/useSiteTheme'
import HeroSection from '@apotome/archetype-shared/components/sections/HeroSection.vue'
import AboutSection from '@apotome/archetype-shared/components/sections/AboutSection.vue'
import RoomsSection from '../components/sections/RoomsSection.vue'
import AmenitiesSection from '../components/sections/AmenitiesSection.vue'
import GallerySection from '@apotome/archetype-shared/components/sections/GallerySection.vue'
import TestimonialsSection from '@apotome/archetype-shared/components/sections/TestimonialsSection.vue'

const { variant: liveVariant } = useSiteTheme()
const galleryLimit = computed(() => VARIANT_PHOTO_COUNT[resolveVariant(liveVariant.value)].gallery)
const isPortfolio = computed(() => variantAtLeast(liveVariant.value, 'portfolio'))
const content = useSiteContentStore()
const reviewItems = computed(() =>
  content.reviewsSource === 'google' && content.googleReviews.length
    ? content.googleReviews
    : siteConfig.testimonials,
)
</script>

<template>
  <HeroSection
    :eyebrow="siteConfig.tagline"
    :title="siteConfig.brand"
    :subtitle="siteConfig.blurb"
    :image="siteConfig.photos.hero.src"
    :image-alt="siteConfig.photos.hero.alt"
    :images="isPortfolio ? [siteConfig.photos.hero, ...siteConfig.photos.gallery.slice(0, 3)] : []"
    :cta-primary="{ label: siteConfig.sections.hero.ctaPrimary, to: '/book' }"
    :cta-secondary="{ label: siteConfig.sections.hero.ctaSecondary, to: '/rooms' }"
    :layout="isPortfolio ? 'stage' : 'split'"
  />
  <AboutSection
    :eyebrow="siteConfig.sections.story.eyebrow"
    :title="siteConfig.story.title"
    :paragraphs="siteConfig.story.paragraphs"
    :facts="siteConfig.story.facts"
    :image="siteConfig.photos.about.src"
    :image-alt="siteConfig.photos.about.alt"
  />
  <RoomsSection
    :eyebrow="siteConfig.sections.rooms.eyebrow"
    :title="siteConfig.sections.rooms.title"
    :rate-from-label="siteConfig.sections.rooms.rateFromLabel"
    :cta-label="siteConfig.sections.rooms.ctaLabel"
    :rooms="siteConfig.rooms.slice(0, isPortfolio ? 4 : 3)"
  />
  <AmenitiesSection
    :eyebrow="siteConfig.sections.amenities.eyebrow"
    :title="siteConfig.sections.amenities.title"
    :amenities="siteConfig.amenities"
  />
  <GallerySection
    :eyebrow="siteConfig.sections.gallery.eyebrow"
    :photos="siteConfig.photos.gallery"
    :limit="galleryLimit"
    :layout="isPortfolio ? 'masonry' : 'grid'"
  />
  <TestimonialsSection
    :eyebrow="siteConfig.sections.reviews.eyebrow"
    :title="siteConfig.sections.reviews.title"
    :items="reviewItems"
  />
</template>
