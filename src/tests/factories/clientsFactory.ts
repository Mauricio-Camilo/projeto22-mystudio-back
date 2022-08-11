import prisma  from "./../../config/database.js";
import { faker } from '@faker-js/faker';
import { Client } from "@prisma/client";

export function createClient () {
    const client = {
        name: faker.name.firstName(),
        payment: "Mensal", 
        startDate: "01/01/2022",
    }
    return client
}

export async function postClient (client : any) {
    await prisma.client.create({data: {
        id: 1,
        name: client.name,
        instructorId: 1,
        paymentId: 1,
        startDate: client.startDate,
        finishDate: client.startDate,
        daysLeft: -1,
        notification: false
    }})
}

export async function deleteAll () {
    await prisma.$transaction([
        prisma.$executeRaw`TRUNCATE TABLE clients RESTART IDENTITY`,
        prisma.$executeRaw`TRUNCATE TABLE payments RESTART IDENTITY CASCADE`,
        prisma.$executeRaw`TRUNCATE TABLE instructors RESTART IDENTITY CASCADE`,
      ]);
}

export async function createPaymentTableData () {
    await prisma.$transaction([
        prisma.$executeRaw`INSERT INTO payments (period) VALUES ('Mensal')`,
        prisma.$executeRaw`INSERT INTO payments (period) VALUES ('Trimestral')`,
        prisma.$executeRaw`INSERT INTO payments (period) VALUES ('Semestral')`,
        prisma.$executeRaw`INSERT INTO payments (period) VALUES ('Anual')`,
    ])
}