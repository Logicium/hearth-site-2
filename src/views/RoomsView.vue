<script setup lang="ts">
import { siteConfig } from '../config/site.config'
import HeroSection from '@apotome/archetype-shared/components/sections/HeroSection.vue'
import RoomsSection from '../components/sections/RoomsSection.vue'
import AmenitiesSection from '../components/sections/AmenitiesSection.vue'
</script>

<template>
  <HeroSection
    subpage
    :eyebrow="siteConfig.sections.roomsPage.eyebrow"
    :title="siteConfig.sections.roomsPage.title"
    :subtitle="siteConfig.sections.roomsPage.subtitle"
    :image="siteConfig.photos.hero.src"
    :image-alt="siteConfig.photos.hero.alt"
  />
  <RoomsSection
    :rooms="siteConfig.rooms"
    :title="siteConfig.sections.rooms.title"
    :rate-from-label="siteConfig.sections.rooms.rateFromLabel"
    :cta-label="siteConfig.sections.rooms.ctaLabel"
  />
  <AmenitiesSection :title="siteConfig.sections.roomsPage.amenitiesTitle" :amenities="siteConfig.amenities" />
</template>
