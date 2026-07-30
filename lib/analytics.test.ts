import { describe, expect, it } from "vitest";
import { dailyGrowth, percentageChange, priceDifference, reviewGrowth } from "./analytics";
describe("analytics", () => { it("calcula mudanças", () => { expect(priceDifference(49.9, 59.9)).toBeCloseTo(-10); expect(percentageChange(50, 100)).toBe(-50); expect(reviewGrowth(190, 120)).toBe(70); expect(dailyGrowth(190, 120, 7)).toBe(10); }); it("trata históricos ausentes e divisão por zero", () => { expect(percentageChange(5, 0)).toBeNull(); expect(reviewGrowth(5, null)).toBeNull(); expect(dailyGrowth(2, 1, 0)).toBeNull(); }); });
