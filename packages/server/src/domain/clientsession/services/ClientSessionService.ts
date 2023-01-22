import {CreateClientSessionUseCase} from "../usecases/CreateClientSessionUseCase";
import {ClientSessionCreateRequestModel} from "../models/ClientSessionCreateRequestModel";

export class ClientSessionService {

    constructor(
        private readonly _createClientSessionUseCase: CreateClientSessionUseCase
    ) {
    }

    public async createClientSession(request: ClientSessionCreateRequestModel) {
        const maybeClientSession = await this._createClientSessionUseCase.execute(request);

        if (maybeClientSession.isLeft()) {
            throw maybeClientSession.getLeft();
        }

        return maybeClientSession.getRight();
    }

}