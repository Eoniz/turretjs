import {ProjectId} from "../../project/models/ProjectId";

export class ProjectVersionCreateRequestModel {
    constructor(
        private readonly _name: string,
        private readonly _projectId: ProjectId,
    ) {
    }

    public get name() {
        return this._name;
    }

    public get projectId() {
        return this._projectId;
    }
}