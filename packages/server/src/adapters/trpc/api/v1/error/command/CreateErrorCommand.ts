
import { z } from "zod";

export const CreateErrorCommandSchema = z.object({
    message: z.string(),
    lineno: z.number(),
    colno: z.number(),
    filename: z.string(),
    clientSessionId: z.number(),
});

export type CreateErrorCommand = z.infer<typeof CreateErrorCommandSchema>;
