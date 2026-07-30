import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();
async function main() { const user = await prisma.user.upsert({ where: { email: "demo@vivadata.dev" }, update: {}, create: { name: "Conta Demo", email: "demo@vivadata.dev", passwordHash: await hash("VivaData123", 12) } }); const competitor = await prisma.competitor.upsert({ where: { userId_shopUrl: { userId: user.id, shopUrl: "https://shop.tiktok.com/view/shop/demo" } }, update: {}, create: { userId: user.id, name: "Beleza Natural", username: "belezanatural", shopUrl: "https://shop.tiktok.com/view/shop/demo", category: "Beleza" } }); await prisma.product.create({ data: { competitorId: competitor.id, externalId: `seed-${Date.now()}`, name: "Sérum Facial Vitamina C", url: "https://shop.tiktok.com/view/product/demo", currentPrice: 49.9, originalPrice: 59.9, rating: 4.8, reviewCount: 190 } }); }
main().finally(()=>prisma.$disconnect());
