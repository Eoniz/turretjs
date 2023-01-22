export class ClientCreateRequestModel {
    constructor(
        private readonly _uuid: string,

    ) {
    }

    public get uuid() {
        return this._uuid;
    }

}