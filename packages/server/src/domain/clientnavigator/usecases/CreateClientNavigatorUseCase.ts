import {ClientNavigatorRepository} from "../repositories/ClientNavigatorRepository";
import {ClientNavigatorCreateRequestModel} from "../models/ClientNavigatorCreateRequestModel";

export class CreateClientNavigatorUseCase {

    constructor(
        private readonly _clientNavigatorRepository: ClientNavigatorRepository
    ) {
    }

    public async execute(clientNavigatorRequest: ClientNavigatorCreateRequestModel) {
        return await this._clientNavigatorRepository.insert(clientNavigatorRequest);
    }
}