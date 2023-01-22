import { z } from "zod";
import {ProjectVersionDtoSchema} from "../../projectversion/dto/ProjectVersionDto";

export const ProjectDtoSchema = z.object({
    id: z.number(),
    name: z.string(),
    creationDatetime: z.string().datetime(),
    versions: z.array(ProjectVersionDtoSchema),
});

export type ProjectDto = z.infer<typeof ProjectDtoSchema>;

