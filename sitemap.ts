import { MetadataRoute } from "next"

// TODO: Replace with your production domain.
// If you are using a `basePath` in your next.config.mjs, you should include it here.
// For example, if your domain is "example.com" and basePath is "/blog",
// then baseUrl should be "https://example.com/blog".
const baseUrl = "https://enginu.munees.co.in"

export default function sitemap(): MetadataRoute.Sitemap {
  // The trailing slashes are added to match the `trailingSlash: true` config in next.config.mjs
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      // Note: The /tools page is linked from the homepage.
      url: `${baseUrl}/tools/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/3d-viewer/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Note: The /about page is linked from the homepage.
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}