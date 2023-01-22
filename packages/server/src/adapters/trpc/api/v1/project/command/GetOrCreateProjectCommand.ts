import { z } from "zod";

export const GetOrCreateProjectCommandSchema = z.object({
    name: z.string(),
    version: z.string().nullable().optional()
});

export type GetOrCreateProjectCommand = z.infer<typeof GetOrCreateProjectCommandSchema>;