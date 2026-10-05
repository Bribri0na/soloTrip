"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { RotateCcw, Shell } from "lucide-react";
import type { SentShell } from "@/lib/shells";
import { getFeed } from "@/lib/visibility"
import type { Profile } from "@/types";
import ProfileCard from "./ProfileCard";
import ShellSheet from "./ShellSheet";
import { useShells } from "./ShellProvider";

type Direction = 1 | -1; 
const THRESHOLD = 110; 

const variants = {
  enter: { scale: 0.94, y: 12 },
  exit: (dir: Direction) => ({
    x: dir * 600,
    rotate: dir * 18,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

function SwipeCard({
  profile,
  direction,
  onDecide,
}: {
  profile: Profile;
  direction: Direction;
  onDecide: (dir: Direction) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const shellOpacity = useTransform(x, [0, THRESHOLD], [0, 1]);
  const nextOpacity = useTransform(x, [-THRESHOLD, 0], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      variants={variants}
      custom={direction}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragSnapToOrigin
      dragElastic={0.7}
      onDragEnd={(_, info) => {
        if (info.offset.x > THRESHOLD) onDecide(1);
        else if (info.offset.x < -THRESHOLD) onDecide(-1);
      }}
    >
      <ProfileCard profile={profile} />

      <motion.span
        style={{ opacity: shellOpacity }}
        className="pointer-events-none absolute left-5 top-14 -rotate-12 rounded-xl border-[3px] border-forest bg-white/90 px-3 py-1 text-xl font-extrabold tracking-wider text-forest"
      >
        SHELL
      </motion.span>
      <motion.span
        style={{ opacity: nextOpacity }}
        className="pointer-events-none absolute right-5 top-14 rotate-12 rounded-xl border-[3px] border-sunset bg-white/90 px-3 py-1 text-xl font-extrabold tracking-wider text-sunset"
      >
        NEXT
      </motion.span>
    </motion.div>
  );
}

export default function SwipeDeck({ profiles }: { profiles: Profile[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const { me, sent, sendShell } = useShells(); 
  const buildDeck = () => getFeed(me, profiles).filter((p) => !sent.some((s) => s.toId === p.id))
  const [ deck, setDeck] = useState(buildDeck)
  const [sheetFor, setSheetFor] = useState<Profile | null>(null); // 正在给谁写贝壳

  const current = deck[index];
  const next = deck[index + 1];


  function request(dir: Direction) {
    if (!current || sheetFor) return;
    if (dir === 1) setSheetFor(current);
    else {
      setDirection(-1);
      setIndex((i) => i + 1);
    }
  }

  function send(shell: SentShell) {
    sendShell(shell);
    setSheetFor(null);
    setDirection(1);
    setIndex((i) => i + 1);
  }

  function restart() {
    setDeck(buildDeck())
    setIndex(0);
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <header className="flex items-center justify-between px-5 pb-3 pt-5">
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="text-2xl">🦕</span> SoloMate
        </div>
        <span className="text-xs font-semibold text-ink/55">
          {sent.length} shell{sent.length === 1 ? "" : "s"} sent
        </span>
      </header>

      <div className="relative mx-4 flex-1">
        {next && (
          <div className="absolute inset-0 translate-y-3 scale-[0.94] opacity-90">
            <ProfileCard profile={next} />
          </div>
        )}

        <AnimatePresence custom={direction}>
          {current && <SwipeCard key={current.id} profile={current} direction={direction} onDecide={request} />}
        </AnimatePresence>

        {!current && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-5xl">🦕</span>
            <h2 className="text-xl font-extrabold">You&apos;ve seen everyone for now</h2>
            <p className="max-w-[240px] text-sm text-ink/70">New travellers join every day. Check Buddy for replies.</p>
            <button
              onClick={restart}
              className="mt-2 flex items-center gap-2 rounded-full bg-mist px-5 py-3 text-sm font-bold"
            >
              <RotateCcw size={16} /> Show them again
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-8 py-4">
        <button
          onClick={() => request(-1)}
          disabled={!current}
          className="h-14 rounded-full bg-white px-8 text-base font-extrabold shadow-lg shadow-ink/10 transition active:scale-95 disabled:opacity-40"
        >
          Next
        </button>
        <button
          onClick={() => request(1)}
          disabled={!current}
          aria-label="Send a shell"
          className="grid h-14 w-14 place-items-center rounded-full bg-forest text-white shadow-lg shadow-forest/30 transition active:scale-95 hover:bg-forest-deep disabled:opacity-40"
        >
          <Shell size={26} />
        </button>
      </div>

      <AnimatePresence>
        {sheetFor && (
          <ShellSheet
            key={sheetFor.id}
            profile={sheetFor}
            item={{ kind: "trip", id: sheetFor.id, label: `${sheetFor.trip.city} trip` }}
            onClose={() => setSheetFor(null)}
            onSend={send}
          />
        )}
      </AnimatePresence>
    </div>
  );
}