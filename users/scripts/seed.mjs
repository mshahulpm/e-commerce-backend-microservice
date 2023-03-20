import { PrismaClient } from '@prisma/client'
import argon from 'argon2'

const prisma = new PrismaClient()

async function seed() {

    if (!(await prisma.user.count())) {
        console.log('seeding database!')
        const password = await argon.hash('password321')
        await prisma.user.createMany({
            data: [{
                email: 'super@gmail.com',
                roles: ['super_admin'],
                password,
                phone: '+919876543210',
                name: 'Super Admin',
            }, {
                email: 'admin@gmail.com',
                roles: ['admin'],
                password,
                phone: '+919876543211',
                name: 'Admin',
            }, {
                email: 'user@gmail.com',
                roles: ['user'],
                password,
                phone: '+919876543212',
                name: 'User',
            }]
        })
        console.log('Seed completed !')
    }

}


seed()