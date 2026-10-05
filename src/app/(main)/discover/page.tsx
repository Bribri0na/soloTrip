import SwipeDeck from "@/components/features/SwipeDeck";
import { ME } from "@/data/me";
import { PROFILES } from "@/data/profiles";
import { getFeed } from "@/lib/visibility";

export default function DiscoverPage() {
  const feed = getFeed(ME, PROFILES);
  return <SwipeDeck profiles={feed} />;
}