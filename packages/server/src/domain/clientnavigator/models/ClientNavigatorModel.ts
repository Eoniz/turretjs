import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {ClientNavigatorId} from "./ClientNavigatorId";
import {ClientId} from "../../client/models/ClientId";
import {ClientModel} from "../../client/models/ClientModel";
import moment from "moment";

export class ClientNavigatorModel implements IdentifiedEntity<ClientNavigatorId> {
    constructor(
        private readonly _id: ClientNavigatorId,
        private readonly _appCodeName: string,
        private readonly _appName: string,
        private readonly _appVersion: string,
        private readonly _userAgent: string,
        private readonly _vendor: string,
        private readonly _platform: string,
        private readonly _clientId: ClientId,
        private readonly _creationDatetime: moment.Moment,
        private readonly _client: ClientModel | null,
    ) {
    }

    public id() {
        return this._id;
    }

    public get appCodeName() {
        return this._appCodeName;
    }

    public get appName() {
        return this._appName;
    }

    public get appVersion() {
        return this._appVersion;
    }

    public get userAgent() {
        return this._userAgent;
    }

    public get vendor() {
        return this._vendor;
    }

    public get platform() {
        return this._platform;
    }

    public get clientId() {
        return this._clientId;
    }

    public get creationDatetime() {
        return this._creationDatetime;
    }

    public get client() {
        return this._client;
    }
}