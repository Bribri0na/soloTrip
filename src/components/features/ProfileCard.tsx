import { MapPin, Plane, ShieldCheck, Ticket } from "lucide-react";
import { formatDateRange } from "@/lib/format";
import type { Profile } from "@/types";

export default function ProfileCard({ profile }: { profile: Profile }) {
  const photo = profile.photos[0];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-xl shadow-ink/15">
    
      <div
        className="relative flex-1"
        style={{ background: `linear-gradient(160deg, ${photo.color}, ${photo.color}99)` }}
      >
        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-ink/55 px-3 py-1.5 text-xs font-semibold text-white">
          <MapPin size={12} />
          {photo.caption}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 text-white">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {profile.name} <span className="font-semibold opacity-80">{profile.age}</span>
          </h2>
          <p className="text-sm font-medium opacity-90">{profile.baseCity}</p>
        </div>
      </div>

      {/* 信息区 */}
      <div className="flex flex-col gap-3 p-4">
        <p className="font-semibold leading-snug">{profile.tagline}</p>

        <p className="flex items-center gap-2 text-sm font-medium text-ink/80">
          <Plane size={16} className="shrink-0 text-forest" />
          {profile.trip.city} · {formatDateRange(profile.trip.startDate, profile.trip.endDate)}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {profile.trip.activities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold">
              {a}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {profile.gender === "man" && profile.vouches !== undefined && (
            <span className="flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-white">
              <ShieldCheck size={13} className="text-sage" />
              Vouched by {profile.vouches} women
            </span>
          )}
          <span className="flex items-center gap-1 rounded-full border border-dashed border-forest px-2.5 py-1 text-forest">
            <Ticket size={13} />
            {profile.verifiedTrips} verified trips
          </span>
        </div>
      </div>
    </div>
  );
}

