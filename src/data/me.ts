import type { Profile } from "@/types";


export const ME: Profile = {
  id: "me",
  name: "Alex",
  age: 28,
  gender: "man",
  visibleTo: "everyone", 
  baseCity: "Stockholm",
  tagline: "Remote designer. Carry-on only, always.",
  trip: {
    city: "Tokyo",
    country: "Japan",
    startDate: "2027-03-20",
    endDate: "2027-04-04",
    activities: ["Cafe Hopping", "Hiking", "Photography Buddy"],
  },
  photos: [],
  prompts: [],
  visited: [],
  verifiedTrips: 4,
};