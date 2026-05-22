<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '../config/site.config'
import { VARIANT_PHOTO_COUNT } from '../themes/tokens'
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import RoomsSection from '../components/sections/RoomsSection.vue'
import AmenitiesSection from '../components/sections/AmenitiesSection.vue'
import GallerySection from '../components/sections/GallerySection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'

const galleryLimit = computed(() => VARIANT_PHOTO_COUNT[siteConfig.variant].gallery)
const isPortfolio = computed(() => siteConfig.variant === 'portfolio')
</script>

<template>
  <HeroSection
    :eyebrow="siteConfig.tagline"
    :title="siteConfig.brand"
    :subtitle="siteConfig.blurb"
    :image="siteConfig.photos.hero.src"
    :image-alt="siteConfig.photos.hero.alt"
    :cta-primary="{ label: 'Book a room', to: '/book' }"
    :cta-secondary="{ label: 'See rooms', to: '/rooms' }"
    :layout="isPortfolio ? 'stage' : 'split'"
  />
  <AboutSection
    eyebrow="The inn"
    :title="siteConfig.story.title"
    :paragraphs="siteConfig.story.paragraphs"
    :facts="siteConfig.story.facts"
    :image="siteConfig.photos.about.src"
    :image-alt="siteConfig.photos.about.alt"
  />
  <RoomsSection
    eyebrow="Rooms"
    title="Eight rooms, every one different"
    :rooms="siteConfig.rooms.slice(0, isPortfolio ? 4 : 3)"
  />
  <AmenitiesSection
    eyebrow="Stay"
    :amenities="siteConfig.amenities"
  />
  <GallerySection
    eyebrow="A look around"
    :photos="siteConfig.photos.gallery"
    :limit="galleryLimit"
    :layout="isPortfolio ? 'masonry' : 'grid'"
  />
  <TestimonialsSection
    eyebrow="From past guests"
    :items="siteConfig.testimonials"
  />
</template>
