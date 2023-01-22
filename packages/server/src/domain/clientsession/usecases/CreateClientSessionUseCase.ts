import {ClientSessionRepository} from "../repositories/ClientSessionRepository";
import {ClientSessionCreateRequestModel} from "../models/ClientSessionCreateRequestModel";

export class CreateClientSessionUseCase {

    constructor(
        private readonly _clientSessionRepository: ClientSessionRepository
    ) {
    }

    public async execute(request: ClientSessionCreateRequestModel) {
        return this._clientSessionRepository.createClientSession(request);
    }

}