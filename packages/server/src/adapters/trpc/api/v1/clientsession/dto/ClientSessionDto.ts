import { z } from "zod";

export const ClientSessionDtoSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    creationDatetime: z.string().datetime(),
    clientId: z.number(),
});

export type ClientSessionDto = z.infer<typeof ClientSessionDtoSchema>;