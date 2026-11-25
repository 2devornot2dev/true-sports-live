// lib/actions/get-all-articles.ts
import { prisma } from "../prisma";

export async function getAllArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      take: 20,
    });

    return articles;
  } catch (error) {
    console.error("getAllArticles failed:", error);
    throw error;
  }
}

export type Articles = Awaited<ReturnType<typeof getAllArticles>>;
export type Article = Articles[number];