import { PROFILES } from "@/data/profiles";

export default function DiscoverPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Discover</h1>
      <p className="mt-2 text-ink/70">{PROFILES.length} travellers (mock data)</p>

      <ul className="mt-4 flex flex-col gap-3">
        {PROFILES.map((p) => (
          <li key={p.id} className="rounded-3xl bg-mist p-4">
            <p className="font-bold">
              {p.name}, {p.age}
            </p>
            <p className="text-sm text-ink/70">
              {p.trip.city} · {p.trip.startDate} → {p.trip.endDate}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.trip.activities.map((a) => (
                <span key={a} className="rounded-full bg-sage/40 px-2.5 py-1 text-xs font-semibold">
                  {a}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}