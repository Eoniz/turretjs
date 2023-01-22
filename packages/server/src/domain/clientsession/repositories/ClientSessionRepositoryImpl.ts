import {ClientSessionRepository} from "./ClientSessionRepository";
import prismaClient from "../../../adapters/persistence/prisma/prismaClient";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {CreateError} from "../../common/errors/CreateError";
import {ClientSessionModel} from "../models/ClientSessionModel";
import {ClientSessionMapper} from "../mappers/ClientSessionMapper";
import {ClientSessionId} from "../models/ClientSessionId";
import {ClientSessionCreateRequestModel} from "../models/ClientSessionCreateRequestModel";

export class ClientSessionRepositoryImpl implements ClientSessionRepository {
    public async findAll(): Promise<Array<ClientSessionModel>> {
        try {
            const clientSessions = await prismaClient.clientSession.findMany({
                include: {
                    client: true
                }
            });

            return clientSessions.map(ClientSessionMapper.fromClientSession);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async findById(id: ClientSessionId): Promise<Either<null, ClientSessionModel>> {
        try {
            const clientSession = await prismaClient.clientSession.findFirst({
                where: {
                    id: id.value()
                },
                include: {
                    client: true
                }
            });

            if (!clientSession) {
                return Either.left(null);
            }

            const mapperClientSession = ClientSessionMapper.fromClientSession(clientSession);
            return Either.right(mapperClientSession);
        } catch (e) {
            console.error(e);
            return Either.left(null);
        }
    }

    public async createClientSession(createRequest: ClientSessionCreateRequestModel): Promise<Either<CreateError, ClientSessionModel>> {
        try {
            const clientSession = await prismaClient.clientSession.create({
                data: {
                    uuid: createRequest.uuid,
                    client_id: createRequest.clientId.value()
                },
                include: {
                    client: true
                }
            });

            const mappedClientSession = ClientSessionMapper.fromClientSession(clientSession);
            return Either.right(mappedClientSession);
        } catch (e) {
            console.error(e);
            return Either.left(new CreateError(`Unable to create Client Session: ${e}`));
        }
    }
}