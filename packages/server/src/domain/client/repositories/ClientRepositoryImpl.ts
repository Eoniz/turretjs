import {ClientRepository} from "./ClientRepository";
import prismaClient from "../../../adapters/persistence/prisma/prismaClient";
import {ClientMapper} from "../mappers/ClientMapper";
import {ClientId} from "../models/ClientId";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {ClientModel} from "../models/ClientModel";
import {NotFoundError} from "../../common/errors/NotFoundError";
import {ClientCreateRequestModel} from "../models/ClientCreateRequestModel";
import {CreateError} from "../../common/errors/CreateError";

export class ClientRepositoryImpl implements ClientRepository {
    public async findAll() {
        try {
            const clients = await prismaClient.client.findMany({
                include: {
                    client_navigator: true,
                    client_sessions: true,
                }
            });

            const mappedClients = clients.map(ClientMapper.fromClient);
            return mappedClients;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async findById(id: ClientId): Promise<Either<null, ClientModel>> {
        try {
            const client = await prismaClient.client.findFirst({
                where: {
                    id: id.value()
                },
                include: {
                    client_navigator: true,
                    client_sessions: true,
                }
            });

            if (!client) {
                return Either.left(null);
            }

            const mappedClient = ClientMapper.fromClient(client);
            return Either.right(mappedClient);
        } catch (e) {
            console.error(e);
            return Either.left(null);
        }
    }

    public async findClientByUuid(uuid: string): Promise<Either<NotFoundError, ClientModel>> {
        try {
            const client = await prismaClient.client.findFirst({
                where: {
                    uuid: uuid
                },
                include: {
                    client_navigator: true,
                    client_sessions: true,
                }
            });

            if (!client) {
                return Either.left(new NotFoundError(`Client with uuid: ${uuid} not found`));
            }

            const mappedClient = ClientMapper.fromClient(client);
            return Either.right(mappedClient);
        } catch (e) {
            console.error(e);
            return Either.left(new NotFoundError(`Client with uuid: ${uuid} not found`));
        }
    }

    public async createClient(request: ClientCreateRequestModel): Promise<Either<CreateError, ClientModel>> {
        try {
            const client = await prismaClient.client.create({
                data: {
                    uuid: request.uuid,
                }
            });

            const mappedClient = ClientMapper.fromClient(client);
            return Either.right(mappedClient);
        } catch (e) {
            console.error(e);
            return Either.left(new CreateError(`Unable to create Client: ${e}`));
        }
    }
}