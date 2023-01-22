import {IdentifiedRepository} from "../../../lib/ddd/repository/IdentifiedRepository";
import {ProjectVersionModel} from "../models/ProjectVersionModel";
import {ProjectVersionId} from "../models/ProjectVersionId";
import {ProjectVersionCreateRequestModel} from "../models/ProjectVersionCreateRequestModel";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {CreateError} from "../../common/errors/CreateError";

export interface ProjectVersionRepository extends IdentifiedRepository<ProjectVersionModel, ProjectVersionId, number> {
    createProjectVersion: (request: ProjectVersionCreateRequestModel) => Promise<Either<CreateError, ProjectVersionModel>>;
}