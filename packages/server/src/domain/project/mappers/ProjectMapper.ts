import {Project, ProjectVersion} from "@prisma/client";
import {ProjectModel} from "../models/ProjectModel";
import {ProjectId} from "../models/ProjectId";
import {ProjectVersionMapper} from "../../projectversion/mappers/ProjectVersionMapper";
import moment from "moment";

export class ProjectMapper {

    public static fromProject(project: Project & { versions?: Array<ProjectVersion> | null }): ProjectModel {
        const versions = (
            project.versions
                ? project.versions.map(ProjectVersionMapper.fromProjectVersion)
                : []
        );

        return new ProjectModel(
            ProjectId.of(project.id),
            project.name,
            moment(project.creation_datetime),
            versions
        );
    }

}