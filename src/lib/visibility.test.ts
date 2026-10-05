import { describe, expect, it } from "vitest";
import { PROFILES } from "@/data/profiles";
import type { Profile } from "@/types";
import { canSee, getFeed } from "./visibility";

const base = PROFILES[0];
const make = (overrides: Partial<Profile>): Profile => ({ ...base, ...overrides });
const ids = (list: Profile[]) => list.map((p) => p.id);

describe("canSee", () => {
  it("hides a women-only profile from men", () => {
    const man = make({ id: "m", gender: "man", visibleTo: "everyone" });
    const womenOnly = make({ id: "w", gender: "woman", visibleTo: "women" });
    expect(canSee(man, womenOnly)).toBe(false);
  });

  it("hides a women-only profile from non-binary users too", () => {
    const nb = make({ id: "n", gender: "nonbinary", visibleTo: "everyone" });
    const womenOnly = make({ id: "w", gender: "woman", visibleTo: "women" });
    expect(canSee(nb, womenOnly)).toBe(false);
  });

  it("lets women see women-only profiles", () => {
    const woman = make({ id: "a", gender: "woman", visibleTo: "everyone" });
    const womenOnly = make({ id: "w", gender: "woman", visibleTo: "women" });
    expect(canSee(woman, womenOnly)).toBe(true);
  });

  it("shows a women-only viewer only women", () => {
    const viewer = make({ id: "v", gender: "woman", visibleTo: "women" });
    const man = make({ id: "m", gender: "man", visibleTo: "everyone" });
    expect(canSee(viewer, man)).toBe(false);
  });

  it("never shows a user to themselves", () => {
    expect(canSee(base, base)).toBe(false);
  });
});

describe("getFeed", () => {
  it("women-only viewer gets only women", () => {
    const viewer = make({ id: "me", gender: "woman", visibleTo: "women" });
    expect(ids(getFeed(viewer, PROFILES)).sort()).toEqual(["aiko", "lena", "sofia"]);
  });

  it("woman who chose 'everyone' also sees men", () => {
    const viewer = make({ id: "me", gender: "woman", visibleTo: "everyone" });
    expect(ids(getFeed(viewer, PROFILES)).sort()).toEqual(["aiko", "kwame", "lena", "mateo", "sofia"]);
  });

  it("man never receives women-only profiles", () => {
    const viewer = make({ id: "me", gender: "man", visibleTo: "everyone" });
    expect(ids(getFeed(viewer, PROFILES)).sort()).toEqual(["kwame", "lena", "mateo"]);
  });

  it("removes blocked users", () => {
    const viewer = make({ id: "me", gender: "woman", visibleTo: "women" });
    expect(ids(getFeed(viewer, PROFILES, ["lena"])).sort()).toEqual(["aiko", "sofia"]);
  });
});