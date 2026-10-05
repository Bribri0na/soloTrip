import type { ActivityTag } from "@/data/activities";

export type Gender = "woman" | "man" | "nonbinary";

/** 谁能看到这个人的资料。女性默认 "women"。 */
export type Visibility = "women" | "everyone";

export type Photo = {
  id: string;
  caption: string; // 地点说明，例如 "Kyoto, Japan"
  color: string; // 占位色，之后换成真实图片
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
  verifiedTrips: number; // 已验证的行程数
  vouches?: number; // 女性旅伴给出的好评数，只有男性资料有；? 表示可以没有
};