import { z } from "zod";

export const LogDtoSchema = z.object({
    id: z.number(),
    log: z.string(),
    logType: z.enum([ "log", "debug", "warning", "error", "trace" ]),
    clientSessionId: z.number(),
    creationDatetime: z.string().datetime(),
});

export type LogDto = z.infer<typeof LogDtoSchema>;
