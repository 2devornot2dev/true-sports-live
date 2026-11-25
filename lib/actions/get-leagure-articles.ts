// lib/actions/get-leagure-articles.ts
import { prisma } from "../prisma";
import { League } from "../generated/prisma/enums";

export async function getLeagueArticles(league: League, excludeId?: string) {
  try {
    return await prisma.article.findMany({
      where: {
        league,
        ...(excludeId ? { id: { not: excludeId } } : {}),
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
      orderBy: { createdAt: "desc" },
      take: 7,
    });
  } catch (error) {
    console.error("getLeagueArticles failed:", error);
    throw error;
  }
}

export type LeagueArticles = Awaited<ReturnType<typeof getLeagueArticles>>;
export type LeagueArticle = LeagueArticles[number];