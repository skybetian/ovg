export interface ProductSocial {
  label: string
  href: string
}

export interface Product {
  slug: string
  name: string
  intro: string
  keyFeatures: string[]
  websiteLabel: string
  websiteHref: string
  socials: ProductSocial[]
  legalNote: string
  hero: string
  gallery: string[]
}

export const products: Product[] = [
  {
    slug: 'bsweeps',
    name: 'Bsweeps',
    intro:
      'Bsweeps is a social sweepstakes entertainment platform operating in U.S. jurisdictions where sweepstakes gaming is permitted under applicable law. The platform uses a promotional sweepstakes model with a free Alternative Method of Entry (AMOE).',
    keyFeatures: [
      'Sweepstakes-model gaming with no purchase necessary',
      'Jurisdiction-aware geolocation enforcement',
      'KYC and age verification',
      'Responsible play tools and resources',
      'Available only in states and jurisdictions where legal. Geofencing and other measures are implemented to ensure location enforcement to meet all federal and state requirements',
    ],
    websiteLabel: 'bsweeps.com',
    websiteHref: 'https://bsweeps.com',
    socials: [
      { label: 'Facebook', href: 'https://www.facebook.com/people/BSweeps-US/pfbid0TZxwyX3P2gAfb2bsA3QWB1kag3BPZZiVrNEVwKspK533C58GZVrtDvnx7tNKQzzol/?mibextid=wwXIfr&rdid=KDlh7avB98nxHxig&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C449UZFpf%2F' },
      { label: 'Instagram', href: 'https://www.instagram.com/bsweeps5' },
      { label: 'YouTube', href: 'http://www.youtube.com/@bsweepsglobal' },
      { label: 'TikTok', href: 'https://tiktok.com/@bsweeps.official' },
      { label: 'X', href: 'https://x.com/bsweepsglobal' },
      { label: 'Telegram', href: 'https://t.me/sweeps8' },
    ],
    legalNote:
      'Bsweeps operates exclusively in states and jurisdictions where sweepstakes gaming is legal. Geofencing and other measures are implemented to ensure location enforcement to meet all federal and state requirements.',
    hero: '/images/bsweeps-gallery-1.webp',
    gallery: [
      '/images/bsweeps-gallery-1.webp',
      '/images/bsweeps-gallery-2.webp',
      '/images/bsweeps-gallery-3.webp',
      '/images/bsweeps-gallery-4.webp',
      '/images/bsweeps-gallery-5.webp',
      '/images/bsweeps-gallery-6.webp',
    ],
  },
]

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
