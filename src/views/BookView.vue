<script setup lang="ts">
import { siteConfig } from '../config/site.config'
import HeroSection from '../components/sections/HeroSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
</script>

<template>
  <HeroSection
    subpage
    eyebrow="Reserve"
    title="Book your stay"
    subtitle="Use our booking partner for instant confirmation, or send us a note and we will reply the same day."
    :image="siteConfig.photos.about.src"
    :image-alt="siteConfig.photos.about.alt"
  />
  <div class="ap-container" style="padding-top: 2rem; text-align: center;">
    <a :href="siteConfig.bookingUrl" class="ap-btn" target="_blank" rel="noopener">Open booking site</a>
  </div>
  <ContactSection
    title="Or just send us a note"
    :address="siteConfig.contact.address"
    :phone="siteConfig.contact.phone"
    :email="siteConfig.contact.email"
    :map-embed-url="siteConfig.contact.mapEmbedUrl"
  />
</template>
