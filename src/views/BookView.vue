<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '../config/site.config'
import HeroSection from '@apotome/archetype-shared/components/sections/HeroSection.vue'
import LodgingBookingSection from '@apotome/archetype-shared/components/sections/LodgingBookingSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import { useSiteContentStore } from '@apotome/archetype-shared/platform/siteContentStore'

const store = useSiteContentStore()
const showLodging = computed(() => store.hasAddOn('lodging'))
/** Only show the external-booking fallback for a real external URL —
    internal paths would just loop back to this page. */
const externalBookingUrl = computed(() =>
  /^https?:\/\//.test(siteConfig.bookingUrl || '') ? siteConfig.bookingUrl : null,
)
</script>

<template>
  <HeroSection
    subpage
    :eyebrow="siteConfig.sections.bookPage.eyebrow"
    :title="siteConfig.sections.bookPage.title"
    :subtitle="siteConfig.sections.bookPage.subtitle"
    :image="siteConfig.photos.about.src"
    :image-alt="siteConfig.photos.about.alt"
  />

  <LodgingBookingSection
    v-if="showLodging"
    :eyebrow="siteConfig.sections.lodging.eyebrow"
    :title="siteConfig.sections.lodging.title"
    :intro="siteConfig.sections.lodging.intro"
  />

  <div v-else-if="externalBookingUrl" class="ap-container" style="padding-top: 2rem; text-align: center;">
    <a :href="externalBookingUrl" class="ap-btn" target="_blank" rel="noopener">{{ siteConfig.sections.bookPage.externalCtaLabel }}</a>
  </div>

  <ContactSection
    :title="siteConfig.sections.contact.title"
    :address="siteConfig.contact.address"
    :phone="siteConfig.contact.phone"
    :email="siteConfig.contact.email"
    :map-embed-url="siteConfig.contact.mapEmbedUrl"
  />
</template>
