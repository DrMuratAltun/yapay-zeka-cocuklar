import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/okul/", "/ogretmen/", "/giris", "/kolay-giris", "/api/"],
      },
    ],
    sitemap: "https://gencyz.com/sitemap.xml",
  };
}
