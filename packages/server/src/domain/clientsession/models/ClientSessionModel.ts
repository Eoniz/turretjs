import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {ClientSessionId} from "./ClientSessionId";
import {ClientId} from "../../client/models/ClientId";
import moment from "moment";
import {ClientModel} from "../../client/models/ClientModel";
import {LogModel} from "../../log/models/LogModel";
import {ErrorModel} from "../../errors/models/ErrorModel";

export class ClientSessionModel implements IdentifiedEntity<ClientSessionId> {

    constructor(
        private readonly _id: ClientSessionId,
        private readonly _clientId: ClientId,
        private readonly _uuid: string,
        private readonly _creationDatetime: moment.Moment,
        private _client: ClientModel | null = null,
        private _logs: Array<LogModel> = [],
        private _errors: Array<ErrorModel> = [],
    ) {
    }

    public id() {
        return this._id;
    }

    public get clientId() {
        return this._clientId;
    }

    public get uuid() {
        return this._uuid;
    }

    public get creationDatetime() {
        return this._creationDatetime;
    }

    public get client() {
        return this._client;
    }

    public set client(newClient) {
        this._client = newClient;
    }

    public get logs() {
        return this._logs;
    }

    public get errors() {
        return this._errors;
    }


}