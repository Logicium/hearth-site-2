import type { ThemeName, SwatchName, SiteVariant } from '@apotome/archetype-shared/themes/tokens'

export interface PhotoSlot { src: string; alt?: string; caption?: string }

export interface HearthPhotos {
  hero: PhotoSlot
  about: PhotoSlot
  rooms: PhotoSlot[]
  gallery: PhotoSlot[]
}

export interface Room {
  name: string
  blurb: string
  image: string
  imageAlt?: string
  features: string[]
  rateFrom?: string
  bookUrl?: string
}

export interface HearthSiteConfig {
  brand: string
  tagline: string
  blurb: string
  theme: ThemeName
  swatch: SwatchName
  variant: SiteVariant
  contact: { address: string; phone: string; email: string; mapEmbedUrl?: string }
  photos: HearthPhotos
  story: { title: string; paragraphs: string[]; facts?: Array<{ label: string; value: string }> }
  rooms: Room[]
  amenities: Array<{ label: string; description?: string; icon?: string }>
  testimonials: Array<{ quote: string; author: string; source?: string }>
  bookingUrl: string
  social: Array<{ label: string; href: string }>
  /** Editable section headers (eyebrows / titles / notes / CTA labels) so
   *  owners control every heading on the site, not just body copy. */
  sections: {
    nav: { home: string; rooms: string; book: string; gallery: string; ctaLabel: string }
    hero: { ctaPrimary: string; ctaSecondary: string }
    story: { eyebrow: string }
    rooms: { eyebrow: string; title: string; rateFromLabel: string; ctaLabel: string }
    amenities: { eyebrow: string; title: string }
    gallery: { eyebrow: string }
    reviews: { eyebrow: string; title: string }
    roomsPage: { eyebrow: string; title: string; subtitle: string; amenitiesTitle: string }
    bookPage: { eyebrow: string; title: string; subtitle: string; externalCtaLabel: string }
    lodging: { eyebrow: string; title: string; intro: string }
    galleryPage: { eyebrow: string; title: string }
    contact: { title: string }
  }
}

import { reactive } from 'vue'

export const siteConfig: HearthSiteConfig = reactive(({
  brand: 'Hearth Inn',
  tagline: 'A small hotel in Trinidad',
  blurb: 'Eight rooms in a restored 1903 brick building, two blocks from Main Street.',
  theme: 'heritage',
  swatch: 'pine-light',
  variant: 'essentials',
  contact: {
    address: '212 Commercial St, Trinidad, CO 81082',
    phone: '(719) 555-0188',
    email: 'stay@hearthinn.com',
    mapEmbedUrl: 'https://www.google.com/maps?q=Trinidad,CO&output=embed',
  },
  // Internal booking page — the built-in reservations system (lodging add-on).
  // Set to an https:// URL only if this site books through an external partner.
  bookingUrl: '/book',
  photos: {
    hero: { src: '/photos/hero.jpg', alt: 'Hearth Inn façade at dusk' },
    about: { src: '/photos/about-lobby.jpg', alt: 'Lobby with fireplace' },
    rooms: [
      { src: '/photos/room-suite.jpg', alt: 'Suite' },
      { src: '/photos/room-king.jpg', alt: 'King room' },
      { src: '/photos/room-queen.jpg', alt: 'Queen room' },
    ],
    gallery: [
      { src: '/photos/exterior-01.jpg', alt: 'Brick façade' },
      { src: '/photos/lobby-01.jpg', alt: 'Lobby seating' },
      { src: '/photos/breakfast-01.jpg', alt: 'Breakfast spread' },
      { src: '/photos/detail-01.jpg', alt: 'Original tilework' },
      { src: '/photos/courtyard-01.jpg', alt: 'Courtyard' },
      { src: '/photos/view-01.jpg', alt: 'View from a guest room' },
    ],
  },
  story: {
    title: 'A quiet base camp for Trinidad.',
    paragraphs: [
      'Hearth opened in a restored 1903 brick building two blocks from Main Street. Eight rooms, one fireplace, and a fresh pot of coffee from 6am.',
      'We host travelers passing through on the way to the mountains, and visitors here for weddings, art, and reunions in the valley below.',
    ],
    facts: [
      { label: 'Rooms', value: '8' },
      { label: 'Built', value: '1903' },
      { label: 'Walk to Main', value: '2 blocks' },
    ],
  },
  rooms: [
    {
      name: 'The Suite',
      blurb: 'Two-room corner suite with original wood floors and a deep soaking tub.',
      image: '/photos/room-suite.jpg',
      features: ['King bed', 'Sleeps 4', 'Soaking tub', 'Sitting room', '500 sq ft'],
      rateFrom: '$245',
      bookUrl: '/book',
    },
    {
      name: 'King Room',
      blurb: 'Bright street-side room with high ceilings and a walk-in shower.',
      image: '/photos/room-king.jpg',
      features: ['King bed', 'Sleeps 2', 'Walk-in shower', '300 sq ft'],
      rateFrom: '$175',
      bookUrl: '/book',
    },
    {
      name: 'Queen Room',
      blurb: 'Cozy back-of-house room overlooking the courtyard.',
      image: '/photos/room-queen.jpg',
      features: ['Queen bed', 'Sleeps 2', 'Garden view', '240 sq ft'],
      rateFrom: '$145',
      bookUrl: '/book',
    },
  ],
  amenities: [
    { label: 'Continental breakfast', description: 'Pastries, fruit, and local coffee from 6–10am.', icon: '☕' },
    { label: 'Pet friendly', description: 'Two-pet maximum; $25/night.', icon: '🐾' },
    { label: 'High-speed Wi-Fi', description: 'Fiber throughout the building.', icon: '↯' },
    { label: 'Off-street parking', description: 'One spot per room, behind the building.', icon: '◫' },
    { label: 'Bike storage', description: 'Locked rack for the rail-trail crowd.', icon: '⚙' },
    { label: '24/7 lobby', description: 'Late check-in available with a code.', icon: '✦' },
  ],
  testimonials: [
    { quote: 'A perfect base for the long weekend. Quiet, clean, and full of character.', author: 'Ana M.', source: 'Booking' },
    { quote: 'The fireplace, the coffee, the staff — every detail is right.', author: 'Greg L.', source: 'Tripadvisor' },
    { quote: 'It feels like staying in someone’s very tasteful home.', author: 'Priya S.', source: 'Airbnb' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ],
  sections: {
    nav: { home: 'Home', rooms: 'Rooms', book: 'Book', gallery: 'Gallery', ctaLabel: 'Book' },
    hero: { ctaPrimary: 'Book a room', ctaSecondary: 'See rooms' },
    story: { eyebrow: 'The inn' },
    rooms: { eyebrow: 'Rooms', title: 'Eight rooms, every one different', rateFromLabel: 'From', ctaLabel: 'Reserve' },
    amenities: { eyebrow: 'Stay', title: 'Everything you need' },
    gallery: { eyebrow: 'A look around' },
    reviews: { eyebrow: 'From past guests', title: 'What our guests say' },
    roomsPage: {
      eyebrow: 'Rooms',
      title: 'Pick your room',
      subtitle: 'Every room has a king or queen bed, fast Wi-Fi, blackout curtains, and a hot shower.',
      amenitiesTitle: 'What is included',
    },
    bookPage: {
      eyebrow: 'Reserve',
      title: 'Book your stay',
      subtitle: 'Use our booking partner for instant confirmation, or send us a note and we will reply the same day.',
      externalCtaLabel: 'Open booking site',
    },
    lodging: {
      eyebrow: 'Reserve',
      title: 'Pick your dates',
      intro: 'Choose your nights and party size \u2014 we\u2019ll show you what\u2019s available.',
    },
    galleryPage: { eyebrow: 'Gallery', title: 'The inn, room by room' },
    contact: { title: 'Or just send us a note' },
  },
}))
