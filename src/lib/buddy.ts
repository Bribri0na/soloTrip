import type { Profile } from "@/types";
import type { ShellItem } from "./shells";
import { canSee } from "./visibility";

export type ShellStatus = "pending" | "accepted" | "declined";

/** 别人送给你的贝壳 */
export type IncomingShell = {
  fromId: string;
  item: ShellItem; 
  message: string; 
  status: ShellStatus;
};

export type InboxEntry = IncomingShell & { profile: Profile };


export function getInbox(
  viewer: Profile,
  incoming: IncomingShell[],
  profiles: Profile[],
  blockedIds: string[] = [],
): InboxEntry[] {
  const entries: InboxEntry[] = [];
  for (const shell of incoming) {
    const profile = profiles.find((p) => p.id === shell.fromId);
    if (!profile) continue;
    if (!canSee(viewer, profile)) continue;
    if (blockedIds.includes(shell.fromId)) continue;
    if (shell.status === "declined") continue;
    entries.push({ ...shell, profile });
  }
  return entries;
}


export function respondToShell(
  incoming: IncomingShell[],
  fromId: string,
  response: "accepted" | "declined",
): IncomingShell[] {
  return incoming.map((s) =>
    s.fromId === fromId && s.status === "pending" ? { ...s, status: response } : s,
  );
}