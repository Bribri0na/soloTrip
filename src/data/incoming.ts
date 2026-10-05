import { ME } from "@/data/me";
import type { IncomingShell } from "@/lib/buddy";
import { buildFirstMessage } from "@/lib/shells";

const item = { kind: "trip", id: ME.id, label: `${ME.trip.city} trip` } as const;
const ctx = { name: ME.name, city: ME.trip.city, itemLabel: item.label };

export const INCOMING: IncomingShell[] = [
  {
    fromId: "sofia",
    item,
    message: buildFirstMessage("trip", ctx),
    status: "pending",
  },
  {
    fromId: "lena",
    item,
    message: buildFirstMessage("activity", { ...ctx, activity: "Cafe Hopping" }),
    status: "pending",
  },
  {
   
    fromId: "kwame",
    item,
    message: buildFirstMessage("item", ctx),
    status: "pending",
  },
];