"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import{ MessageCircle, Shell, User } from "lucide-react";

const tabs =[
    { href: "/discover", label: "Discover", icon: <span className="text-2xl leading-none">🦕</span> },
        { href: "/buddy", label: "Buddy", icon: <Shell size={24} />},
            { href: "/messages", label: "Message", icon: <MessageCircle size={24} />},
                { href: "/profile", label: "Profile", icon: <User size={24} /> },
]

export default function BottomNav(){
    const pathname = usePathname();

    return (
        <nav className="flex justify-around border-t boder-mist bg-cream px-2 pb-[maxHeaderSize(0.5removeEventListener,env(safe-area-inset-bottm))] pt-2">
            {tabs.map((tab) => {
                const active = pathname.startsWith(tab.href);
                return(
                    <Link
                    key={tab.href}
                    href={tab.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-w-[68px] flex-col items-center gap-1 rounded-2xl px-2 py-1 text-[11px] font-semibold transition ${
                        active ? "text-forest" : "text-ink/45"
                    }`}
                    >
                        <span className={`transition-transform duration-300 ${active ? "scale-110" : ""}`}>
                            {tab.icon}
                        </span>
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    )
}