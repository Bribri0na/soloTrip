import BottomNav from "@/components/features/BottomNav";

export default function MainLayout({ children }:{ children: React.ReactNode }){
    return(
        <div className="flex min-h-dvh items-center justify-center bg-sage/40 md:p-6">
            <div className="flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-cream md:h-[844px] md:max-h-[calc(100dvh-48px)] md:rounded-[44px] md:ring-8 md:ring-ink">
                <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</main>
                <BottomNav />
            </div>
        </div>
    )
}