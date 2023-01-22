import { z } from "zod";

export const ProjectVersionDtoSchema = z.object({
    id: z.number(),
    name: z.string(),
    creationDatetime: z.string().datetime(),
    projectId: z.number(),
});

export type ProjectVersionDto = z.infer<typeof ProjectVersionDtoSchema>;
