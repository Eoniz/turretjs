import { z } from "zod";
import {ClientNavigatorDtoSchema} from "../../clientnavigator/dto/ClientNavigatorDto";

export const ClientDtoSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    creationDatetime: z.string().datetime(),
    clientNavigator: ClientNavigatorDtoSchema.nullable(),
})


export type ClientDto = z.infer<typeof ClientDtoSchema>;
