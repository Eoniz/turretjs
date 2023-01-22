import { z } from "zod";

export const ErrorDtoSchema = z.object({
    id: z.number(),
    message: z.string(),
    lineno: z.number(),
    colno: z.number(),
    filename: z.string(),
    clientSessionId: z.number(),
    creationDatetime: z.string().datetime(),
});

export type ErrorDto = z.infer<typeof ErrorDtoSchema>;
