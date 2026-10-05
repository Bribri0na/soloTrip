import { describe, expect, it } from "vitest";
import { addShell, buildFirstMessage, isOpenerReady, type SentShell } from "./shells";

const ctx = { name: "Aiko", city: "Seoul", itemLabel: "Seoul trip" };

const shell = (overrides: Partial<SentShell> = {}): SentShell => ({
  toId: "aiko",
  item: { kind: "trip", id: "aiko", label: "Seoul trip" },
  openerId: "trip",
  message: "hi",
  ...overrides,
});

describe("buildFirstMessage", () => {
  it("builds the trip opener from the city", () => {
    expect(buildFirstMessage("trip", ctx)).toBe(
      "Your Seoul trip looks great. Want to plan something together?",
    );
  });

  it("builds the activity opener from the chosen activity", () => {
    expect(buildFirstMessage("activity", { ...ctx, activity: "Cafe Hopping" })).toBe(
      "I'd love to try Cafe Hopping with you in Seoul.",
    );
  });

  it("builds the item opener from the item label", () => {
    expect(buildFirstMessage("item", ctx)).toBe("Your Seoul trip caught my eye. Tell me more?");
  });
});

describe("isOpenerReady", () => {
  it("needs an activity for the activity opener", () => {
    expect(isOpenerReady("activity", undefined)).toBe(false);
    expect(isOpenerReady("activity", "Hiking")).toBe(true);
  });

  it("is always ready for the other openers", () => {
    expect(isOpenerReady("trip", undefined)).toBe(true);
    expect(isOpenerReady("item", undefined)).toBe(true);
  });
});

describe("addShell", () => {
  it("adds a shell without mutating the old list", () => {
    const before: SentShell[] = [];
    const after = addShell(before, shell());
    expect(after).toHaveLength(1);
    expect(before).toHaveLength(0);
  });

  it("allows only one shell per person", () => {
    const first = addShell([], shell());
    const second = addShell(first, shell({ openerId: "item" }));
    expect(second).toHaveLength(1);
    expect(second[0].openerId).toBe("trip");
  });

  it("keeps shells to different people", () => {
    const list = addShell(addShell([], shell()), shell({ toId: "lena" }));
    expect(list.map((s) => s.toId)).toEqual(["aiko", "lena"]);
  });
});