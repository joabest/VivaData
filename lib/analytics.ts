export function priceDifference(current: number, previous?: number | null) { return previous == null ? null : current - previous; }
export function percentageChange(current: number, previous?: number | null) { return previous == null || previous === 0 ? null : ((current - previous) / previous) * 100; }
export function reviewGrowth(current: number, previous?: number | null) { return previous == null ? null : current - previous; }
export function dailyGrowth(current: number, previous: number | null, days: number) { const total = reviewGrowth(current, previous); return total == null || days <= 0 ? null : total / days; }
