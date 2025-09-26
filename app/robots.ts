import { MetadataRoute } from 'next'

// ✅ Required for `output: export`
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://enginu.munees.co.in/sitemap.xml',
  }
}
