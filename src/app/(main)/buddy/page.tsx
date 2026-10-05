"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Avatar from "@/components/features/Avatar";
import { useShells } from "@/components/features/ShellProvider";
import { ME } from "@/data/me";
import { PROFILES } from "@/data/profiles";
import { getInbox, type InboxEntry } from "@/lib/buddy";
import { formatDateRange } from "@/lib/format";

type Tab = "received" | "sent";

function ReceivedCard({
  entry,
  onRespond,
}: {
  entry: InboxEntry;
  onRespond: (fromId: string, response: "accepted" | "declined") => void;
}) {
  const { profile } = entry;
  return (
    <li className="flex flex-col gap-3 rounded-[24px] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar profile={profile} />
        <div className="min-w-0">
          <p className="font-extrabold">
            {profile.name} <span className="font-semibold text-ink/60">{profile.age}</span>
          </p>
          <p className="truncate text-xs font-medium text-ink/65">
            {profile.trip.city} · {formatDateRange(profile.trip.startDate, profile.trip.endDate)}
          </p>
        </div>
        {profile.gender === "man" && profile.vouches !== undefined && (
          <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-ink px-2 py-1 text-[10px] font-semibold text-white">
            <ShieldCheck size={11} className="text-sage" />
            Vouched by {profile.vouches}
          </span>
        )}
      </div>

      <p className="text-[11px] font-bold uppercase tracking-wide text-ink/50">
        Shell for your <span className="rounded-full bg-mist px-2 py-0.5 normal-case tracking-normal text-ink">{entry.item.label}</span>
      </p>
      <p className="rounded-2xl rounded-tl-md bg-mist px-4 py-3 text-sm font-semibold">{entry.message}</p>

      {entry.status === "pending" ? (
        <div className="flex gap-3">
          <button
            onClick={() => onRespond(entry.fromId, "declined")}
            className="h-11 flex-1 rounded-full bg-cream text-sm font-extrabold ring-1 ring-ink/10"
          >
            Not now
          </button>
          <button
            onClick={() => onRespond(entry.fromId, "accepted")}
            className="h-11 flex-[1.4] rounded-full bg-forest text-sm font-extrabold text-white hover:bg-forest-deep"
          >
            Say hi
          </button>
        </div>
      ) : (
        <p className="rounded-2xl bg-forest/10 px-4 py-3 text-sm font-bold text-forest-deep">
          You&apos;re buddies! Your chat will be in{" "}
          <Link href="/messages" className="underline">
            Messages
          </Link>
          .
        </p>
      )}
    </li>
  );
}

export default function BuddyPage() {
  const { incoming, sent, respond } = useShells();
  const [tab, setTab] = useState<Tab>("received");

  const inbox = getInbox(ME, incoming, PROFILES);
  const pending = inbox.filter((e) => e.status === "pending").length;

  return (
    <div className="flex flex-1 flex-col">
      <header className="px-5 pb-3 pt-5">
        <h1 className="text-2xl font-extrabold tracking-tight">Buddy</h1>
        <div className="mt-3 flex rounded-full bg-mist p-1" role="tablist">
          {(
            [
              ["received", `Shells for you${pending ? ` (${pending})` : ""}`],
              ["sent", `You sent (${sent.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`h-10 flex-1 rounded-full text-sm font-bold transition ${
                tab === id ? "bg-white shadow-sm" : "text-ink/55"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 px-4 pb-4">
        {tab === "received" &&
          (inbox.length === 0 ? (
            <Empty emoji="🐚" title="No shells yet" text="When someone sends you a shell, it shows up here." />
          ) : (
            <ul className="flex flex-col gap-3">
              {inbox.map((entry) => (
                <ReceivedCard key={entry.fromId} entry={entry} onRespond={respond} />
              ))}
            </ul>
          ))}

        {tab === "sent" &&
          (sent.length === 0 ? (
            <Empty emoji="🦕" title="Nothing sent yet" text="Send a shell from Discover to say hi to a traveller." />
          ) : (
            <ul className="flex flex-col gap-3">
              {sent.map((s) => {
                const profile = PROFILES.find((p) => p.id === s.toId);
                if (!profile) return null;
                return (
                  <li key={s.toId} className="flex flex-col gap-2 rounded-[24px] bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Avatar profile={profile} />
                      <div>
                        <p className="font-extrabold">To {profile.name}</p>
                        <p className="text-xs font-semibold text-ink/55">Waiting for a reply</p>
                      </div>
                    </div>
                    <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-forest px-4 py-3 text-sm font-semibold text-white">
                      {s.message}
                    </p>
                  </li>
                );
              })}
            </ul>
          ))}
      </div>
    </div>
  );
}

function Empty({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
      <span className="text-5xl">{emoji}</span>
      <h2 className="text-lg font-extrabold">{title}</h2>
      <p className="text-sm text-ink/70">{text}</p>
    </div>
  );
}