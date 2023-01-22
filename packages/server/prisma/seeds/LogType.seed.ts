import { PrismaClient, LogType } from "@prisma/client";

const logTypes: Record<number, LogType> = {
    1: {
        id: 1,
        label: "log",
    },
    2: {
        id: 2,
        label: "debug",
    },
    3: {
        id: 3,
        label: "warning"
    },
    4: {
        id: 4,
        label: "error"
    },
    5: {
        id: 5,
        label: "trace"
    }
};

export async function main(prisma: PrismaClient) {
    for (const logTypeToCreate of Object.values(logTypes)) {
        await prisma.logType.upsert({
            where: {
                id: logTypeToCreate.id,
            },
            update: {
              ...logTypeToCreate
            },
            create: {
                ...logTypeToCreate
            }
        });
    }
}
