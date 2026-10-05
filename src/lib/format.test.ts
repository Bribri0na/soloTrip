import { expect, it } from "vitest";
import { formatDateRange } from "./format";

it(" formats a date range", () => {
    expect(formatDateRange("2026-11-12", "2026-11-20")).toBe("Nov 12 - Nov 20");
});

it("does not shift the day becase of time zones",() => {
    expect(formatDateRange("2027-01-01", "2027-01-08")).toBe("Jan 1 - Jan 8");
})