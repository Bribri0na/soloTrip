"use client";

import Avatar from "@/components/features/Avatar";
import { useShells } from "@/components/features/ShellProvider";
import { ME } from "@/data/me";
import { PROFILES } from "@/data/profiles";
import { getInbox } from "@/lib/buddy";

export default function MessagesPage() {
  const { incoming } = useShells();

  const chats = getInbox(ME, incoming, PROFILES).filter((e) => e.status === "accepted");

  return (
    <div className="flex flex-1 flex-col">
      <header className="px-5 pb-3 pt-5">
        <h1 className="text-2xl font-extrabold tracking-tight">Messages</h1>
      </header>

      {chats.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
          <span className="text-5xl">💬</span>
          <h2 className="text-lg font-extrabold">No chats yet</h2>
          <p className="text-sm text-ink/70">Say hi to a shell in Buddy and your chat will show up here.</p>
        </div>
      ) : (
        <ul className="flex flex-col px-2">
          {chats.map((chat) => (
            <li key={chat.fromId} className="flex items-center gap-3 rounded-2xl px-3 py-3">
              <Avatar profile={chat.profile} />
              <div className="min-w-0 flex-1">
                <p className="font-extrabold">{chat.profile.name}</p>
                <p className="truncate text-sm text-ink/65">{chat.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}