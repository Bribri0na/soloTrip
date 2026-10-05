"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { ME } from "@/data/me";
import { INCOMING } from "@/data/incoming";
import { respondToShell, type IncomingShell } from "@/lib/buddy";
import { addShell, type SentShell } from "@/lib/shells";
import type { Profile, Visibility } from "@/types";

type ShellStore = {
  me: Profile; 
  sent: SentShell[]; 
  incoming: IncomingShell[]; 
  setVisibleTo: (visibleTo: Visibility) => void;
  sendShell: (shell: SentShell) => void;
  respond: (fromId: string, response: "accepted" | "declined") => void;
};

const ShellContext = createContext<ShellStore | null>(null);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<Profile>(ME);
  const [sent, setSent] = useState<SentShell[]>([]);
  const [incoming, setIncoming] = useState<IncomingShell[]>(INCOMING);

  const store = useMemo<ShellStore>(
    () => ({
      me,
      sent,
      incoming,
      setVisibleTo: (visibleTo) => setMe((prev) => ({ ...prev, visibleTo })),
      sendShell: (shell) => setSent((prev) => addShell(prev, shell)),
      respond: (fromId, response) => setIncoming((prev) => respondToShell(prev, fromId, response)),
    }),
    [me, sent, incoming],
  );

  return <ShellContext.Provider value={store}>{children}</ShellContext.Provider>;
}

export function useShells(): ShellStore {
  const store = useContext(ShellContext);
  if (!store) throw new Error("useShells must be used inside <ShellProvider>");
  return store;
}