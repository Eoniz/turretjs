import {ProjectModel} from "../../../../../../domain/project/models/ProjectModel";
import {ProjectDto} from "../dto/ProjectDto";
import {ProjectVersionDtoMapper} from "../../projectversion/mapper/ProjectVersionDtoMapper";
import {DateUtils} from "../../../../../../utils/date/DateUtils";

export class ProjectDtoMapper {

    public static toProjectDto(project: ProjectModel): ProjectDto {
        const versions = project.versions.map(ProjectVersionDtoMapper.toProjectVersionDto);

        return {
            id: project.id().value(),
            name: project.name,
            versions: versions,
            creationDatetime: DateUtils.toStringDatetime(project.creationDatetime),
        };
    }

}