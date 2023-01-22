import {ProjectVersion, Project} from "@prisma/client";
import {ProjectVersionModel} from "../models/ProjectVersionModel";
import {ProjectVersionId} from "../models/ProjectVersionId";
import {ProjectMapper} from "../../project/mappers/ProjectMapper";
import {ProjectId} from "../../project/models/ProjectId";
import moment from "moment";

export class ProjectVersionMapper {

    public static fromProjectVersion(projectVersion: ProjectVersion & { project?: Project | null }): ProjectVersionModel {
        const project = (
            projectVersion.project
                ? ProjectMapper.fromProject(projectVersion)
                : null
        );

        return new ProjectVersionModel(
            ProjectVersionId.of(projectVersion.id),
            projectVersion.name,
            ProjectId.of(projectVersion.project_id),
            moment(projectVersion.creation_datetime),
            project
        )
    }

}