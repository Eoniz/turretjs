import {ClientRepository} from "../repositories/ClientRepository";

export class FindClientByUuidUseCase {

    constructor(
        private readonly _clientRepository: ClientRepository,
    ) {
    }

    public async execute(uuid: string) {
        return await this._clientRepository.findClientByUuid(uuid);
    }

}