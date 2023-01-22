import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {ProjectVersionId} from "./ProjectVersionId";
import {ProjectId} from "../../project/models/ProjectId";
import {ProjectModel} from "../../project/models/ProjectModel";
import moment from "moment";

export class ProjectVersionModel implements IdentifiedEntity<ProjectVersionId> {

    constructor(
        private readonly _id: ProjectVersionId,
        private readonly _name: string,
        private readonly _projectId: ProjectId,
        private readonly _creationDatetime: moment.Moment,

        private _project: ProjectModel | null = null
    ) {
    }

    public id() {
        return this._id;
    }

    public get name() {
        return this._name.toLowerCase().trim();
    }

    public get projectId() {
        return this._projectId;
    }

    public get project() {
        return this._project;
    }

    public set project(newProject: ProjectModel | null) {
        this._project = newProject;
    }

    public get creationDatetime() {
        return this._creationDatetime;
    }

    public isVersionEqualToName(name?: string | null) {
        if (!name) {
            return false;
        }

        return this.name === name.toLowerCase().trim();
    }
}