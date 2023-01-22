import {ClientSessionId} from "../../clientsession/models/ClientSessionId";

export class ErrorCreateRequestModel {

    constructor(
        private readonly _message: string,
        private readonly _lineno: number,
        private readonly _colno: number,
        private readonly _filename: string,
        private readonly _clientSessionId: ClientSessionId,
    ) {
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

}