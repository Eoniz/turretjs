import { z } from "zod";

export const CreateLogCommandSchema = z.object({
    log: z.string(),
    logType: z.enum([ "log", "debug", "warning", "error", "trace" ]),
    clientSessionId: z.number(),
});

export type CreateLogCommand = z.infer<typeof CreateLogCommandSchema>;
