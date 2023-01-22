import { z } from "zod";

export const GetOrCreateClientSessionCommandSchema = z.object({
    uuid: z.string(),
    clientId: z.number(),
});

export type GetOrCreateClientSessionCommand = z.infer<typeof GetOrCreateClientSessionCommandSchema>;
