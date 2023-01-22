import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {ClientId} from "./ClientId";
import {ClientNavigatorModel} from "../../clientnavigator/models/ClientNavigatorModel";
import moment from "moment";
import {ClientSessionModel} from "../../clientsession/models/ClientSessionModel";

export class ClientModel implements IdentifiedEntity<ClientId> {
    constructor(
        private readonly _id: ClientId,
        private readonly _uuid: string,
        private readonly _creationDatetime: moment.Moment,

        private _clientNavigator: ClientNavigatorModel | null = null,
        private _clientSessions: Array<ClientSessionModel> = [],
    ) {
    }

    public id() {
        return this._id;
    }

    public get uuid() {
        return this._uuid;
    }

    public get clientNavigator() {
        return this._clientNavigator;
    }

    public get creationDatetime() {
        return this._creationDatetime;
    }

    public set clientNavigator(clientNavigator: ClientNavigatorModel | null) {
        this._clientNavigator = clientNavigator;
    }

    public get clientSessions() {
        return this._clientSessions;
    }

    public set clientSessions(newClientSessions) {
        this._clientSessions = newClientSessions;
    }

}