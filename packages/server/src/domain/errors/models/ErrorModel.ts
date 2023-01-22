import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {ErrorId} from "./ErrorId";
import {ClientSessionId} from "../../clientsession/models/ClientSessionId";
import moment from "moment";
import {ClientSessionModel} from "../../clientsession/models/ClientSessionModel";

export class ErrorModel implements IdentifiedEntity<ErrorId> {

    constructor(
        private readonly _id: ErrorId,
        private readonly _message: string,
        private readonly _lineno: number,
        private readonly _colno: number,
        private readonly _filename: string,
        private readonly _clientSessionId: ClientSessionId,
        private readonly _creationDatetime: moment.Moment,

        private _clientSession: ClientSessionModel | null = null,
    ) {
    }

    public id() {
        return this._id;
    }

    public get message() {
        return this._message;
    }

    public get lineno() {
        return this._lineno;
    }

    public get colno() {
        return this._colno;
    }

    public get filename() {
        return this._filename;
    }

    public get clientSessionId() {
        return this._clientSessionId;
    }

    public get creationDatetime() {
        return this._creationDatetime;
    }

    public get clientSession() {
        return this._clientSession;
    }

    public set clientSession(newClientSession) {
        this._clientSession = newClientSession;
    }

}