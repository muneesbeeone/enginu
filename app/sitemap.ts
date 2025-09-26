import { MetadataRoute } from "next"

const baseUrl = "https://enginu.munees.co.in"

// Helper function to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = formatDate(new Date())

  return [
    {
      url: `${baseUrl}`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/3d-viewer`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
