import { z } from "zod";
export const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(8).max(72) });
export const competitorSchema = z.object({ name: z.string().trim().min(2).max(100), shopUrl: z.string().url().refine((url) => new URL(url).hostname.endsWith("tiktok.com"), "Use uma URL do TikTok"), category: z.string().trim().max(80).optional() });
export const productSchema = z.object({ competitorId: z.string().cuid(), name: z.string().trim().min(2).max(180), url: z.string().url(), currentPrice: z.coerce.number().nonnegative(), reviewCount: z.coerce.number().int().nonnegative().default(0) });
