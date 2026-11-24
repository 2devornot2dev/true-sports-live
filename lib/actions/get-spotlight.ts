"use server";

import { prisma } from "../prisma";

export async function getSpotlight() {
  try {
    const spotlight = await prisma.dailySpotlight.findFirst({
      include: {
        stories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return spotlight;
  } catch (error) {
    console.error("getSpotlight failed:", error);
    return null;
  }
}