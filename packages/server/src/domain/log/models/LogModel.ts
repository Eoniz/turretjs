import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {LogId} from "./LogId";
import {ClientSessionId} from "../../clientsession/models/ClientSessionId";
import {LogTypeId} from "../../logtype/models/LogTypeId";
import moment from "moment";
import {ClientSessionModel} from "../../clientsession/models/ClientSessionModel";
import {GetLogTypeFromIdVisitor} from "../../logtype/visitors/LogTypeIdVisitor";
import {LogTypeModel} from "../../logtype/models/LogTypeModel";

export class LogModel implements IdentifiedEntity<LogId> {
    constructor(
        private readonly _id: LogId,
        private readonly _log: string,
        private readonly _logTypeId: LogTypeId,
        private readonly _clientSessionId: ClientSessionId,
        private readonly _creationDatetime: moment.Moment,
        private _clientSession: ClientSessionModel | null = null
    ) {
    }

    public id() {
        return this._id;
    }

    public get log() {
        return this._log;
    }

    public get logTypeId() {
        return this._logTypeId;
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

    public get logType(): LogTypeModel {
        return this._logTypeId.accept(GetLogTypeFromIdVisitor);
    }

}