import {CreateClientNavigatorUseCase} from "../usecases/CreateClientNavigatorUseCase";
import {ClientNavigatorCreateRequestModel} from "../models/ClientNavigatorCreateRequestModel";

export class ClientNavigatorService {

    constructor(
        private readonly _createClientNavigatorUseCase: CreateClientNavigatorUseCase
    ) {
    }

    public async createClientNavigator(clientNavigatorRequest: ClientNavigatorCreateRequestModel) {
        return await this._createClientNavigatorUseCase.execute(clientNavigatorRequest);
    }

}