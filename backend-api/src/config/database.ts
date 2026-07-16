import { PrismaClient } from '@prisma/client';

// Prisma client - یەک instance بۆ هەموو ئەپەکە
export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

// پەیوەندی بە دەیتابەیسەوە دەکات و دڵنیایی دەدات
export async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Database connected (Prisma + Neon)');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

export default prisma;
