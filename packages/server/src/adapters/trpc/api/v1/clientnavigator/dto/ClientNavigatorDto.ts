import {z} from "zod";

export const ClientNavigatorDtoSchema = z.object({
    id: z.number(),
    appCodeName: z.string(),
    appName: z.string(),
    appVersion: z.string(),
    userAgent: z.string(),
    vendor: z.string(),
    platform: z.string(),
    clientId: z.number(),
    creationDatetime: z.string().datetime(),
})

export type ClientNavigatorDto = z.infer<typeof ClientNavigatorDtoSchema>;