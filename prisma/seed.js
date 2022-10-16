const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    firstName: 'Adit',
    LastName: 'Bala',
    email: 'aditbala.berkeley.edu',
    username: 'aditbala',
    gender: 'Male',
    request: {
      pickup: "Unit 1",
      destination: "SFO",
      domestic: false,
      active: true
    }
  },
]

const sample = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          domestic: false,
          pickup: 'Unit 1',
        },
      ],
    },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
