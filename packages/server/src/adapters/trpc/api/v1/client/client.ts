import {trpc} from "../../../trpc";
import {provideClientService} from "../../../../../domain/client/dependency/ClientDependencyInjector";
import {GetOrCreateClientCommandSchema} from "./command/GetOrCreateClientCommandSchema";
import {ClientDtoSchema} from "./dto/ClientDto";
import {ClientDtoMapper} from "./mapper/ClientDtoMapper";

const clientService = provideClientService();

export const clientRouter = trpc.router({
    getOrCreateClient: trpc.procedure
        .meta({ openapi: { method: "POST", path: "/v1/clients/get-or-create", tags: ['Clients'] } })
        .input(GetOrCreateClientCommandSchema)
        .output(ClientDtoSchema.nullable())
        .mutation(async ({ input }) => {
            console.log("POST /api/v1/clients/get-or-create");
            const client = await clientService.findClientByUuid(input.uuid);
            if (client.isRight()) {
                return ClientDtoMapper.toClientDto(client.getRight())
            }

            const createdClient = await clientService.createClient(input);
            return ClientDtoMapper.toClientDto(createdClient);
        })
});

export type ClientRouter = typeof clientRouter;
