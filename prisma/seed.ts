// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: "Learn Next.js",
        description: "Complete the Task Scheduler project",
        dueDate: new Date("2023-12-31T00:00:00Z"),
        priority: "HIGH",
      },
      {
        title: "Build Frontend",
        description: "Style the application using Tailwind CSS",
        dueDate: new Date("2023-11-15T00:00:00Z"),
        priority: "MEDIUM",
      },
    ],
  });
}

main()
  .then(() => console.log("Data seeded successfully"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
