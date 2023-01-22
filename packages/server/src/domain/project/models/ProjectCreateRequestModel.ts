export class ProjectCreateRequestModel {

    constructor(
        private readonly _name: string,
    ) {
    }

    public get name() {
        return this._name.toLowerCase().trim();
    }

}