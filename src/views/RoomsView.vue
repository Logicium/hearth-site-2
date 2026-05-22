<script setup lang="ts">
import { siteConfig } from '../config/site.config'
import HeroSection from '../components/sections/HeroSection.vue'
import RoomsSection from '../components/sections/RoomsSection.vue'
import AmenitiesSection from '../components/sections/AmenitiesSection.vue'
</script>

<template>
  <HeroSection
    subpage
    eyebrow="Rooms"
    title="Pick your room"
    subtitle="Every room has a king or queen bed, fast Wi-Fi, blackout curtains, and a hot shower."
    :image="siteConfig.photos.hero.src"
    :image-alt="siteConfig.photos.hero.alt"
  />
  <RoomsSection :rooms="siteConfig.rooms" />
  <AmenitiesSection title="What is included" :amenities="siteConfig.amenities" />
</template>
