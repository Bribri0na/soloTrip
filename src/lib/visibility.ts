import type { Profile } from "@/types";


export function canSee(viewer: Profile, target: Profile): boolean {
  // 不会看到自己
  if (viewer.id === target.id) return false;

  // 规则 1：对方设为"仅女性可见"，而我不是女性 → 对方对我完全隐形
  if (target.visibleTo === "women" && viewer.gender !== "woman") return false;

  // 规则 2：我自己设为"仅女性"，我也只会看到女性
  if (viewer.visibleTo === "women" && target.gender !== "woman") return false;

  return true;
}


export function getFeed(viewer: Profile, all: Profile[], blockedIds: string[] = []): Profile[] {
  return all.filter((p) => canSee(viewer, p) && !blockedIds.includes(p.id));
}