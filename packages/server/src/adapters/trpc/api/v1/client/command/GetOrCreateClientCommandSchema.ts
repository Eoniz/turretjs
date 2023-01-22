import { z } from "zod";

export const GetOrCreateClientCommandSchema = z.object({
    uuid: z.string(),
    navigator: z.object({
        appCodeName: z.string(),
        appName: z.string(),
        appVersion: z.string(),
        userAgent: z.string(),
        vendor: z.string(),
        platform: z.string(),
    })
});

export type GetOrCreateClientCommand = z.infer<typeof GetOrCreateClientCommandSchema>;

