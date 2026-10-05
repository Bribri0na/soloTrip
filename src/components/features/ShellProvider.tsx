"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { INCOMING } from "@/data/incoming";
import { respondToShell, type IncomingShell } from "@/lib/buddy";
import { addShell, type SentShell } from "@/lib/shells";

type ShellStore = {
  sent: SentShell[]; 
  incoming: IncomingShell[]; 
  sendShell: (shell: SentShell) => void;
  respond: (fromId: string, response: "accepted" | "declined") => void;
};

const ShellContext = createContext<ShellStore | null>(null);

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [sent, setSent] = useState<SentShell[]>([]);
  const [incoming, setIncoming] = useState<IncomingShell[]>(INCOMING);

  const store = useMemo<ShellStore>(
    () => ({
      sent,
      incoming,
      sendShell: (shell) => setSent((prev) => addShell(prev, shell)),
      respond: (fromId, response) => setIncoming((prev) => respondToShell(prev, fromId, response)),
    }),
    [sent, incoming],
  );

  return <ShellContext.Provider value={store}>{children}</ShellContext.Provider>;
}

export function useShells(): ShellStore {
  const store = useContext(ShellContext);
  if (!store) throw new Error("useShells must be used inside <ShellProvider>");
  return store;
}