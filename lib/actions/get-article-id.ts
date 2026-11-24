import { prisma } from "../prisma";

export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return article;
  } catch (error) {
    console.error("getArticleById failed:", error);
    return null;
  }
}

export type ArticleWithAuthorProps = Awaited<ReturnType<typeof getArticleById>>;