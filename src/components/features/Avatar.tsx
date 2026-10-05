import type { Profile } from "@/types";


export default function Avatar({ profile }: { profile: Profile }) {
  return (
    <div
      aria-hidden="true"
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white"
      style={{ background: profile.photos[0].color }}
    >
      {profile.name[0]}
    </div>
  );
} 