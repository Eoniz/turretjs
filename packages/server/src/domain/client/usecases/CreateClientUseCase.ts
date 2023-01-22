import {ClientRepository} from "../repositories/ClientRepository";
import {ClientCreateRequestModel} from "../models/ClientCreateRequestModel";

export class CreateClientUseCase {

    constructor(
        private readonly _clientRepository: ClientRepository
    ) {

    }

    public async execute(command: ClientCreateRequestModel) {
        return await this._clientRepository.createClient(command);
    }

}