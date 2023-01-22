import {FindClientByUuidUseCase} from "../usecases/FindClientByUuidUseCase";
import {
    GetOrCreateClientCommand
} from "../../../adapters/trpc/api/v1/client/command/GetOrCreateClientCommandSchema";
import {ClientNavigatorService} from "../../clientnavigator/services/ClientNavigatorService";
import {providerClientNavigatorService} from "../../clientnavigator/dependency/ClientNavigatorDependencyInjector";
import {CreateClientUseCase} from "../usecases/CreateClientUseCase";
import {ClientCreateRequestModel} from "../models/ClientCreateRequestModel";
import {ClientNavigatorCreateRequestModel} from "../../clientnavigator/models/ClientNavigatorCreateRequestModel";

export class ClientService {

    private readonly _clientNavigatorService: ClientNavigatorService;

    constructor(
        private readonly _findClientByUuidUseCase: FindClientByUuidUseCase,
        private readonly _createClientUseCase: CreateClientUseCase,
    ) {
        this._clientNavigatorService = providerClientNavigatorService();
    }

    public async findClientByUuid(uuid: string) {
        return await this._findClientByUuidUseCase.execute(uuid);
    }

    public async createClient(command: GetOrCreateClientCommand) {
        const clientCreateRequestModel = new ClientCreateRequestModel(command.uuid);
        const maybeClient = await this._createClientUseCase.execute(clientCreateRequestModel);

        if (maybeClient.isLeft()) {
            throw maybeClient.getLeft();
        }

        const client = maybeClient.getRight();
        const clientNavigatorCreateRequestModel = new ClientNavigatorCreateRequestModel(
            command.navigator.appCodeName,
            command.navigator.appName,
            command.navigator.appVersion,
            command.navigator.userAgent,
            command.navigator.vendor,
            command.navigator.platform,
            client.id()
        );

        const maybeClientNavigator = (
            await this._clientNavigatorService.createClientNavigator(clientNavigatorCreateRequestModel)
        );

        if (maybeClientNavigator.isLeft()) {
            throw maybeClientNavigator.getLeft();
        }

        client.clientNavigator = maybeClientNavigator.getRight();
        return client;
    }

}