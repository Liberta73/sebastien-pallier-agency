import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/zoe", "/api/zoe", "/api/zoe/access"],
    },
    sitemap: "https://sebastienpallier.com/sitemap.xml",
  };
}
