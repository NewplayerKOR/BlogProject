import { CapabilitySection } from "@/components/home/capability-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
import { JourneySection } from "@/components/home/journey-section";
import { RecentPosts } from "@/components/home/recent-posts";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />
      <CapabilitySection />
      <FeaturedProjects />
      <JourneySection />
      <RecentPosts posts={recentPosts} />
    </>
  );
}
