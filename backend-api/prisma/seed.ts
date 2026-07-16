import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Admin user - بەڕێوەبەر
  const adminPassword = await bcryptjs.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { phone: '07500000000' },
    update: {},
    create: {
      phone: '07500000000',
      email: 'admin@globallcloud.com',
      passwordHash: adminPassword,
      fullName: 'Admin User',
      role: 'ADMIN',
      language: 'KU',
    },
  });
  console.log('✅ Admin created:', admin.phone, '(password: admin123)');

  // 2. چەند کڕیار
  const customersData = [
    { phone: '07701111111', fullName: 'ئارام محمد', code: 'GC-1001', city: 'Erbil' },
    { phone: '07702222222', fullName: 'سارا احمد', code: 'GC-1002', city: 'Baghdad' },
    { phone: '07703333333', fullName: 'کاروان علی', code: 'GC-1003', city: 'Sulaymaniyah' },
  ];

  const customerRecords = [];
  for (const c of customersData) {
    const pw = await bcryptjs.hash('customer123', 10);
    const user = await prisma.user.upsert({
      where: { phone: c.phone },
      update: {},
      create: {
        phone: c.phone,
        passwordHash: pw,
        fullName: c.fullName,
        role: 'CUSTOMER',
        language: 'KU',
        customer: {
          create: { customerCode: c.code, city: c.city },
        },
      },
      include: { customer: true },
    });
    if (user.customer) customerRecords.push(user.customer);
  }
  console.log(`✅ ${customerRecords.length} customers created`);

  // 3. چەند بار (shipments)
  if (customerRecords.length > 0) {
    const statuses = ['PENDING', 'IN_TRANSIT', 'ARRIVED_IRAQ', 'DELIVERED'] as const;
    const existing = await prisma.shipment.count();
    if (existing === 0) {
      for (let i = 0; i < 12; i++) {
        const cust = customerRecords[i % customerRecords.length];
        const cost = 100 + Math.floor(Math.random() * 900);
        await prisma.shipment.create({
          data: {
            trackingNumber: `${cust.customerCode}-${1000 + i}`,
            customerId: cust.id,
            originCountry: i % 2 === 0 ? 'CHINA' : 'UAE',
            originCity: i % 2 === 0 ? 'Guangzhou' : 'Dubai',
            destinationCity: cust.city ?? 'Erbil',
            shippingType: i % 3 === 0 ? 'AIR' : 'SEA',
            status: statuses[i % statuses.length],
            weightKg: 5 + Math.floor(Math.random() * 50),
            shippingCost: cost,
            totalCost: cost,
            currency: 'USD',
            paymentStatus: i % 2 === 0 ? 'PAID' : 'UNPAID',
          },
        });
      }
      console.log('✅ 12 shipments created');
    }
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
