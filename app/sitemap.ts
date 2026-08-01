import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jkdistroshop.com'
  const currentDate = new Date()

  // Base pages
  const routes = [
    '',
    '/shop',
    '/shop?category=flower',
    '/shop?category=vapes',
    '/about',
    '/blog',
    '/faq',
    '/contact',
    '/shipping',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/shop' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : route.startsWith('/shop') ? 0.9 : 0.8,
  }))

  // Dynamic products
  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const filePath = path.join(process.cwd(), 'data', 'scraped-products.json')
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      const products = JSON.parse(data)
      productRoutes = products.map((product: any) => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Failed to generate product sitemap entries:', error)
  }

  // Dynamic blog post routes
  const blogSlugs = [
    'science-of-terpenes',
    'indica-sativa-hybrid',
    'vape-care-101',
    'rise-of-live-resin',
    'is-jk-distro-legit',
    'how-long-jk-distro-ship',
    'does-jk-distro-id',
    'is-jk-distro-sprayed',
    'where-is-jk-distro-located',
    'does-jk-distro-ship-texas',
    'jk-distro-wholesale-prices',
    'where-does-jk-distro-ship-from'
  ]

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...productRoutes, ...blogRoutes]
}
