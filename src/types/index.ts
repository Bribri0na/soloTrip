import type { ActivityTag } from "@/data/activities";

export type Gender = "woman" | "man" | "nonbinary";
export type Visibility = "women" | "everyone";

export type Photo = {
  id: string;
  caption: string; 
  color: string; 
};

export type PromptAnswer = {
  question: string;
  answer: string;
};

export type VisitedPlace = {
  flag: string; // 国旗 emoji
  name: string;
};

export type Trip = {
  city: string;
  country: string;
  startDate: string; // "2026-11-12"
  endDate: string;
  activities: ActivityTag[];
};

export type Profile = {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  visibleTo: Visibility;
  baseCity: string;
  tagline: string;
  trip: Trip;
  photos: Photo[];
  prompts: PromptAnswer[];
  visited: VisitedPlace[];
  verifiedTrips: number; 
  vouches?: number; 
};