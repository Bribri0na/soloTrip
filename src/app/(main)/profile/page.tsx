"use client";

import { useState } from "react";
import { Plane, ShieldCheck, Ticket } from "lucide-react";
import { useShells } from "@/components/features/ShellProvider";
import { PROFILES } from "@/data/profiles";
import { getInbox } from "@/lib/buddy";
import { formatDateRange } from "@/lib/format";
import { getFeed } from "@/lib/visibility";
import type { Visibility } from "@/types";

const OPTIONS: { value: Visibility; title: string; text: string }[] = [
  { value: "women", title: "Women only", text: "Only women can see you, and you only see women." },
  { value: "everyone", title: "Everyone", text: "Anyone can see you, and you can see everyone." },
];

export default function ProfilePage() {
  const { me, incoming, setVisibleTo } = useShells();
  const [confirming, setConfirming] = useState(false);


  const inDiscover = getFeed(me, PROFILES).length;
  const waiting = getInbox(me, incoming, PROFILES).filter((e) => e.status === "pending").length;

  function choose(value: Visibility) {
    if (value === me.visibleTo) return;
    if (value === "everyone") setConfirming(true); // 变得更公开：先二次确认
    else {
      setConfirming(false);
      setVisibleTo("women");
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-6 pt-5">
      <header className="flex items-center gap-4 px-1">
        <div
          aria-hidden="true"
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sage text-2xl font-extrabold text-ink"
        >
          {me.name[0]}
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {me.name} <span className="font-semibold text-ink/60">{me.age}</span>
          </h1>
          <p className="text-sm font-medium text-ink/65">{me.baseCity}</p>
        </div>
      </header>

      <p className="px-1 font-semibold leading-snug">{me.tagline}</p>

      <section className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-bold">
          <Plane size={16} className="shrink-0 text-forest" />
          {me.trip.city} · {formatDateRange(me.trip.startDate, me.trip.endDate)}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {me.trip.activities.map((a) => (
            <span key={a} className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold">
              {a}
            </span>
          ))}
        </div>
        <span className="flex w-fit items-center gap-1 rounded-full border border-dashed border-forest px-2.5 py-1 text-xs font-semibold text-forest">
          <Ticket size={13} />
          {me.verifiedTrips} verified trips
        </span>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="visibility-heading">
        <h2 id="visibility-heading" className="flex items-center gap-2 px-1 text-sm font-extrabold">
          <ShieldCheck size={16} className="text-forest" /> Who can see me
        </h2>

        <div className="flex flex-col gap-2" role="radiogroup" aria-labelledby="visibility-heading">
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              role="radio"
              aria-checked={me.visibleTo === o.value}
              onClick={() => choose(o.value)}
              className={`rounded-2xl border-2 px-4 py-3 text-left transition ${
                me.visibleTo === o.value ? "border-forest bg-mist" : "border-transparent bg-white"
              }`}
            >
              <p className="text-sm font-extrabold">{o.title}</p>
              <p className="text-xs font-medium text-ink/65">{o.text}</p>
            </button>
          ))}
        </div>

        {confirming && (
          <div role="alertdialog" aria-label="Confirm visibility change" className="flex flex-col gap-3 rounded-2xl bg-sunset/15 p-4">
            <p className="text-sm font-bold">Show your profile to everyone, including men?</p>
            <p className="text-xs font-medium text-ink/70">
              You can switch back to Women only at any time. Men you see will show how many women have vouched for them.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="h-11 flex-1 rounded-full bg-white text-sm font-extrabold"
              >
                Keep women only
              </button>
              <button
                onClick={() => {
                  setVisibleTo("everyone");
                  setConfirming(false);
                }}
                className="h-11 flex-[1.4] rounded-full bg-forest text-sm font-extrabold text-white hover:bg-forest-deep"
              >
                Yes, show me
              </button>
            </div>
          </div>
        )}

        <p data-testid="effect" className="rounded-2xl bg-mist px-4 py-3 text-xs font-semibold text-ink/75">
          Right now: {inDiscover} travellers in Discover · {waiting} shell{waiting === 1 ? "" : "s"} waiting in Buddy
        </p>
      </section>
    </div>
  );
}