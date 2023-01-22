import {ClientNavigatorRepository} from "./ClientNavigatorRepository";
import {ClientNavigatorModel} from "../models/ClientNavigatorModel";
import prismaClient from "../../../adapters/persistence/prisma/prismaClient";
import {ClientNavigatorMapper} from "../mappers/ClientNavigatorMapper";
import {ClientNavigatorId} from "../models/ClientNavigatorId";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {CreateError} from "../../common/errors/CreateError";
import {ClientNavigatorCreateRequestModel} from "../models/ClientNavigatorCreateRequestModel";

export class ClientNavigatorRepositoryImpl implements ClientNavigatorRepository {
    public async findAll(): Promise<Array<ClientNavigatorModel>> {
        try {
            const clientNavigators = await prismaClient.clientNavigator.findMany({
                include: {
                    client: true
                }
            });

            return clientNavigators.map(ClientNavigatorMapper.fromClientNavigator);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async findById(id: ClientNavigatorId): Promise<Either<null, ClientNavigatorModel>> {
        try {
            const clientNavigator = await prismaClient.clientNavigator.findFirst({
                where: {
                    id: id.value()
                },
                include: {
                    client: true
                }
            });

            if (!clientNavigator) {
                return Either.left(null);
            }

            const mappedClientNavigator = ClientNavigatorMapper.fromClientNavigator(clientNavigator);
            return Either.right(mappedClientNavigator);
        } catch (e) {
            console.error(e);
            return Either.left(null);
        }
    }

    public async insert(createRequest: ClientNavigatorCreateRequestModel): Promise<Either<CreateError, ClientNavigatorModel>> {
        try {
            const clientNavigator = await prismaClient.clientNavigator.create({
                data: {
                    app_code_name: createRequest.appCodeName,
                    app_name: createRequest.appName,
                    app_version: createRequest.appVersion,
                    user_agent: createRequest.userAgent,
                    vendor: createRequest.vendor,
                    platform: createRequest.platform,
                    client_id: createRequest.clientId.value(),
                },
                include: {
                    client: true
                }
            });

            const mappedClientNavigator = ClientNavigatorMapper.fromClientNavigator(clientNavigator);
            return Either.right(mappedClientNavigator);
        } catch (e) {
            console.error(e);
            return Either.left(new CreateError(`Unable to create Client Navigator: ${e}`));
        }
    }
}