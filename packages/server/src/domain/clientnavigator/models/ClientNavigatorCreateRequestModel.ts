import {ClientId} from "../../client/models/ClientId";

export class ClientNavigatorCreateRequestModel {
    constructor(
        private readonly _appCodeName: string,
        private readonly _appName: string,
        private readonly _appVersion: string,
        private readonly _userAgent: string,
        private readonly _vendor: string,
        private readonly _platform: string,
        private readonly _clientId: ClientId,
    ) {
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

}