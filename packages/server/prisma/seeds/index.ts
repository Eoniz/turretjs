import { PrismaClient } from "@prisma/client";

import { main as seedLogType } from "./LogType.seed";

const prismaSeedingClient = new PrismaClient();


async function main() {
    await seedLogType(prismaSeedingClient);
}

main()
    .then(async () => {
        await prismaSeedingClient.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismaSeedingClient.$disconnect();
        process.exit(1);
    });
