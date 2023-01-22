import {IdentifiedRepository} from "../../../lib/ddd/repository/IdentifiedRepository";
import {ProjectModel} from "../models/ProjectModel";
import {ProjectId} from "../models/ProjectId";
import {CreateError} from "../../common/errors/CreateError";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {ProjectCreateRequestModel} from "../models/ProjectCreateRequestModel";
import {NotFoundError} from "../../common/errors/NotFoundError";

export interface ProjectRepository extends IdentifiedRepository<ProjectModel, ProjectId, number> {
    findProjectByName: (name: string) => Promise<Either<NotFoundError, ProjectModel>>;
    createProject: (request: ProjectCreateRequestModel) => Promise<Either<CreateError, ProjectModel>>;
}