import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('1234', 10);

    const users = [
        {
            email: 'recep@gmail.com',
            name: 'Sara',
            password: hashedPassword,
            role: Role.RECEPTIONIST,
        },
        {
            email: 'sales@gmail.com',
            name: 'Priya',
            password: hashedPassword,
            role: Role.SALES_EXECUTIVE,
        },
        {
            email: 'recep2@gmail.com',
            name: 'Sara Ipad',
            password: hashedPassword,
            role: Role.RECEPTIONIST_2,
        }
    ];

    for (const userData of users) {
        await prisma.user.upsert({
            where: { email: userData.email },
            update: {
                password: userData.password,
                role: userData.role
            },
            create: userData,
        });
    }

    // Seed some initial projects
    const projects = [
        { name: 'Skyline Residency', location: 'Vikhroli' },
        { name: 'Green Valley', location: 'Thane' },
        { name: 'Ocean View', location: 'Worli' }
    ];

    for (const projectData of projects) {
        await prisma.project.upsert({
            where: { name: projectData.name },
            update: {},
            create: projectData,
        });
    }

    console.log('✅ Database seeded with professional data and hashed passwords.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
