import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { id: string; createdAt: Date }[] = [];

  try {
    articles = await prisma.article.findMany({
      select: { id: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("sitemap prisma query failed:", error);
  }

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://www.truesportslive.com/articles/${article.id}`,
    lastModified: article.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://www.truesportslive.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.truesportslive.com/merch",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://www.truesportslive.com/work-with-us",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...articleUrls,
  ];
}