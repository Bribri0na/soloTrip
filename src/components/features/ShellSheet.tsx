"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shell } from "lucide-react";
import type { ActivityTag } from "@/data/activities";
import { buildFirstMessage, isOpenerReady, OPENERS, type OpenerId, type SentShell, type ShellItem } from "@/lib/shells";
import type { Profile } from "@/types";

type Props = {
  profile: Profile;
  item: ShellItem;
  onClose: () => void;
  onSend: (shell: SentShell) => void;
};

export default function ShellSheet({ profile, item, onClose, onSend }: Props) {
  const [openerId, setOpenerId] = useState<OpenerId>("trip");
  const [activity, setActivity] = useState<ActivityTag | undefined>(undefined);

  // 按 Esc 关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const opener = OPENERS.find((o) => o.id === openerId)!;
  const ready = isOpenerReady(openerId, activity);
  const message = ready
    ? buildFirstMessage(openerId, {
        name: profile.name,
        city: profile.trip.city,
        itemLabel: item.label,
        activity,
      })
    : "Pick an activity to see your message.";

  function send() {
    if (!ready) return;
    onSend({ toId: profile.id, item, openerId, activity, message });
  }

  return (
    <>
      <motion.button
        aria-label="Close"
        className="absolute inset-0 z-10 bg-ink/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Send a shell to ${profile.name}`}
        className="absolute inset-x-0 bottom-0 z-20 flex max-h-[85%] flex-col gap-4 overflow-y-auto rounded-t-[28px] bg-cream p-5 shadow-2xl"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
      >
        <div>
          <h2 className="text-lg font-extrabold">Send a shell to {profile.name}</h2>
          <p className="text-xs font-semibold text-ink/55">
            For: <span className="rounded-full bg-mist px-2 py-0.5 text-ink">{item.label}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Opener">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/55">Pick an opener</p>
          {OPENERS.map((o) => (
            <button
              key={o.id}
              role="radio"
              aria-checked={openerId === o.id}
              onClick={() => setOpenerId(o.id)}
              className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition ${
                openerId === o.id ? "border-forest bg-mist text-forest-deep" : "border-transparent bg-white"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {opener.needsActivity && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-ink/55">Which activity?</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.trip.activities.map((a) => (
                <button
                  key={a}
                  aria-pressed={activity === a}
                  onClick={() => setActivity(a)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    activity === a ? "bg-forest text-white" : "bg-white"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink/55">Your first message</p>
          <p
            data-testid="preview"
            className={`rounded-2xl rounded-bl-md px-4 py-3 text-sm font-semibold ${
              ready ? "bg-forest text-white" : "bg-mist text-ink/55"
            }`}
          >
            {message}
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="h-12 flex-1 rounded-full bg-white text-sm font-extrabold">
            Cancel
          </button>
          <button
            onClick={send}
            disabled={!ready}
            className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-forest text-sm font-extrabold text-white transition hover:bg-forest-deep disabled:opacity-40"
          >
            <Shell size={18} /> Send shell
          </button>
        </div>
      </motion.div>
    </>
  );
}