import { ArticleFeed } from "@/components/site/article-feed";
import { HeroFeature } from "@/components/site/hero-feature";
import { Scoreboard } from "@/components/site/scoreboard";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { WorkWithUsHeroOverlay } from "@/components/site/work-with-us-overlay";
import { getAllArticles } from "@/lib/actions/get-all-articles";
import { fetchAllScores } from "@/lib/sports-api";

export const revalidate = 3600;

export default async function HomePage() {
  const [initialGames, articles] = await Promise.all([
    fetchAllScores(),
    getAllArticles(),
  ]);

  const heroArticles = articles.slice(0, 4);
  const feedArticles = articles.slice(4);

  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-background relative">
      <WorkWithUsHeroOverlay />

      <SiteHeader />

      <main className="min-w-0 flex-1">
        <Scoreboard initialGames={initialGames} />

        <HeroFeature articles={heroArticles} />

        <ArticleFeed articles={feedArticles} />
      </main>

      <SiteFooter />
    </div>
  );
}