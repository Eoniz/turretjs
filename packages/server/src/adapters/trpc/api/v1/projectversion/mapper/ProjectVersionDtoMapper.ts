import {ProjectVersionModel} from "../../../../../../domain/projectversion/models/ProjectVersionModel";
import {ProjectVersionDto} from "../dto/ProjectVersionDto";
import {DateUtils} from "../../../../../../utils/date/DateUtils";

export class ProjectVersionDtoMapper {

    public static toProjectVersionDto(projectVersion: ProjectVersionModel): ProjectVersionDto {
        return {
            projectId: projectVersion.projectId.value(),
            name: projectVersion.name,
            id: projectVersion.id().value(),
            creationDatetime: DateUtils.toStringDatetime(projectVersion.creationDatetime),
        };
    }

}