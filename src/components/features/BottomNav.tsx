"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShells } from "@/components/features/ShellProvider";

import { PROFILES } from "@/data/profiles";
import { getInbox } from "@/lib/buddy";

const tabs = [
  { href: "/discover", label: "Discover", emoji: "🦕" },
  { href: "/buddy", label: "Buddy", emoji: "🐚" },
  { href: "/messages", label: "Messages", emoji: "💬" },
  { href: "/profile", label: "Profile", emoji: "🧳" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const {me, incoming} = useShells();
  
  const pending = getInbox(me, incoming, PROFILES).filter((e) => e.status === "pending").length;

  return (
    <nav className="flex justify-around border-t border-mist bg-cream px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);
        const badge = tab.href === "/buddy" ? pending : 0;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-w-[68px] flex-col items-center gap-1 rounded-2xl px-2 py-1 text-[11px] font-semibold transition ${
              active ? "text-forest" : "text-ink/45"
            }`}
          >
            <span className="relative">
              <span
                aria-hidden="true"
                className={`block text-2xl leading-none transition duration-300 ${
                  active ? "scale-110 drop-shadow-[0_4px_8px_rgba(63,110,47,0.4)]" : "opacity-70 grayscale"
                }`}
              >
                {tab.emoji}
              </span>
              {badge > 0 && (
                <span
                  aria-label={`${badge} new`}
                  className="absolute -right-2.5 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-sunset px-1 text-[10px] font-extrabold text-white"
                >
                  {badge}
                </span>
              )}
            </span>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}