import {ClientId} from "../../client/models/ClientId";

export class ClientSessionCreateRequestModel {

    constructor(
        private readonly _clientId: ClientId,
        private readonly _uuid: string,
    ) {
    }

    public get clientId() {
        return this._clientId;
    }

    public get uuid() {
        return this._uuid;
    }

}