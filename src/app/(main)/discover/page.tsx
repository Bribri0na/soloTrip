import SwipeDeck from "@/components/features/SwipeDeck";
import { PROFILES } from "@/data/profiles";


export default function DiscoverPage() {
  return <SwipeDeck profiles={PROFILES} />;
}