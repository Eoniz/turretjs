import {LogTypeModel} from "../../logtype/models/LogTypeModel";
import {ClientSessionId} from "../../clientsession/models/ClientSessionId";

export class LogCreateRequestModel {

    constructor(
        private readonly _log: string,
        private readonly _logType: LogTypeModel,
        private readonly _clientSessionId: ClientSessionId,
    ) {
    }

    public get log() {
        return this._log;
    }

    public get logType() {
        return this._logType;
    }

    public get clientSessionId() {
        return this._clientSessionId;
    }

}