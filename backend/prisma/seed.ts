import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.cafe.createMany({
    data: [
      { id: '11111111-1111-1111-1111-111111111111', name: 'BeanThere', description: 'Cozy local cafe', location: 'Orchard' },
      { id: '22222222-2222-2222-2222-222222222222', name: 'BrewHaha', description: 'Open-air specialty coffee', location: 'Tiong Bahru' },
      { id: '33333333-3333-3333-3333-333333333333', name: 'Daily Grind', description: 'Work-friendly cafe', location: 'Orchard' }
    ],
    skipDuplicates: true
  });

  await prisma.employee.createMany({
    data: [
      { id: 'UIA000001', name: 'Alice Tan', email: 'alice@example.com', phone: '91234567', gender: 'Female', cafeId: '11111111-1111-1111-1111-111111111111', startDate: new Date('2024-01-15') },
      { id: 'UIA000002', name: 'Bob Lim', email: 'bob@example.com', phone: '91234568', gender: 'Male', cafeId: '11111111-1111-1111-1111-111111111111', startDate: new Date('2024-06-01') },
      { id: 'UIA000003', name: 'Cindy Ong', email: 'cindy@example.com', phone: '81234567', gender: 'Female', cafeId: '22222222-2222-2222-2222-222222222222', startDate: new Date('2025-01-01') },
      { id: 'UIA000004', name: 'David Lee', email: 'david@example.com', phone: '91234569', gender: 'Male', cafeId: null, startDate: null }
    ],
    skipDuplicates: true
  });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
