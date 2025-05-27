import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testCandidate() {
  try {
    const candidate = await prisma.candidate.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        address: "123 Main St",
        education: "Bachelor's Degree",
        work_experience: "5 years as developer"
      }
    });
    console.log('Created candidate:', candidate);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCandidate();