import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {ProjectId} from "./ProjectId";
import {ProjectVersionModel} from "../../projectversion/models/ProjectVersionModel";
import moment from "moment";

export class ProjectModel implements IdentifiedEntity<ProjectId> {
    constructor(
        private readonly _id: ProjectId,
        private readonly _name: string,
        private readonly _creationDatetime: moment.Moment,
        private _versions: Array<ProjectVersionModel> = []
    ) {
    }

    public id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get versions() {
        return this._versions;
    }

    public get creationDatetime() {
        return this._creationDatetime;
    }

    public set versions(newVersions: Array<ProjectVersionModel>) {
        this._versions = newVersions;
    }
}