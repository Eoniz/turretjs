import {trpc} from "../../../trpc";
import {GetOrCreateClientSessionCommandSchema} from "./command/GetOrCreateClientSessionCommand";
import {ClientSessionDtoSchema} from "./dto/ClientSessionDto";
import {
    provideClientSessionService
} from "../../../../../domain/clientsession/dependency/ClientSessionDependencyInjector";
import {
    ClientSessionCreateRequestModel
} from "../../../../../domain/clientsession/models/ClientSessionCreateRequestModel";
import {ClientId} from "../../../../../domain/client/models/ClientId";
import {ClientSessionDtoMapper} from "./mapper/ClientSessionDtoMapper";

const clientSessionService = provideClientSessionService();

export const clientSessionRouter = trpc.router({
    getOrCreateClientSession: trpc.procedure
        .meta({ openapi: { method: 'POST', path: '/v1/sessions/get-or-create', tags: ['Sessions'] } })
        .input(GetOrCreateClientSessionCommandSchema)
        .output(ClientSessionDtoSchema)
        .mutation(async ({ input }) => {
            const clientSessionCreateRequestModel = new ClientSessionCreateRequestModel(
                ClientId.of(input.clientId),
                input.uuid
            );

            const clientSession = await clientSessionService.createClientSession(clientSessionCreateRequestModel);
            return ClientSessionDtoMapper.toClientSessionDto(clientSession);
        })
});

export type ClientSessionRouter = typeof clientSessionRouter;
