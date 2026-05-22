import type { ThemeName, SwatchName, SiteVariant } from '../themes/tokens'

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
}

export const siteConfig: HearthSiteConfig = {
  brand: 'Hearth Inn',
  tagline: 'A small hotel in Trinidad',
  blurb: 'Eight rooms in a restored 1903 brick building, two blocks from Main Street.',
  theme: 'heritage',
  swatch: 'forest',
  variant: 'essentials',
  contact: {
    address: '212 Commercial St, Trinidad, CO 81082',
    phone: '(719) 555-0188',
    email: 'stay@hearthinn.com',
    mapEmbedUrl: 'https://www.google.com/maps?q=Trinidad,CO&output=embed',
  },
  bookingUrl: 'https://example.com/book',
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
      bookUrl: 'https://example.com/book/suite',
    },
    {
      name: 'King Room',
      blurb: 'Bright street-side room with high ceilings and a walk-in shower.',
      image: '/photos/room-king.jpg',
      features: ['King bed', 'Sleeps 2', 'Walk-in shower', '300 sq ft'],
      rateFrom: '$175',
      bookUrl: 'https://example.com/book/king',
    },
    {
      name: 'Queen Room',
      blurb: 'Cozy back-of-house room overlooking the courtyard.',
      image: '/photos/room-queen.jpg',
      features: ['Queen bed', 'Sleeps 2', 'Garden view', '240 sq ft'],
      rateFrom: '$145',
      bookUrl: 'https://example.com/book/queen',
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
}
