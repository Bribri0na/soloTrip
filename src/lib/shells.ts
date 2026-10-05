import type { ActivityTag } from "@/data/activities";

/** 贝壳是送给"某一样具体的东西"的：行程、照片、问答、去过的地方 */
export type ShellItem = {
  kind: "trip" | "photo" | "prompt" | "place";
  id: string;
  label: string; 
};

export type OpenerId = "trip" | "activity" | "item";

type OpenerContext = {
  name: string;
  city: string;
  itemLabel: string;
  activity?: ActivityTag;
};


export const OPENERS: {
  id: OpenerId;
  label: string;
  needsActivity: boolean;
  render: (c: OpenerContext) => string;
}[] = [
  {
    id: "trip",
    label: "Plan something together",
    needsActivity: false,
    render: (c) => `Your ${c.city} trip looks great. Want to plan something together?`,
  },
  {
    id: "activity",
    label: "Suggest an activity",
    needsActivity: true,
    render: (c) => `I'd love to try ${c.activity} with you in ${c.city}.`,
  },
  {
    id: "item",
    label: "Ask about what caught my eye",
    needsActivity: false,
    render: (c) => `Your ${c.itemLabel} caught my eye. Tell me more?`,
  },
];

export function buildFirstMessage(openerId: OpenerId, ctx: OpenerContext): string {
  const opener = OPENERS.find((o) => o.id === openerId);
  if (!opener) throw new Error(`Unknown opener: ${openerId}`);
  return opener.render(ctx);
}


export function isOpenerReady(openerId: OpenerId, activity: ActivityTag | undefined): boolean {
  const opener = OPENERS.find((o) => o.id === openerId);
  if (!opener) return false;
  return !opener.needsActivity || activity !== undefined;
}

export type SentShell = {
  toId: string;
  item: ShellItem;
  openerId: OpenerId;
  activity?: ActivityTag;
  message: string;
};


export function addShell(shells: SentShell[], shell: SentShell): SentShell[] {
  if (shells.some((s) => s.toId === shell.toId)) return shells;
  return [...shells, shell];
}