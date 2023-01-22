import {IdentifiedRepository} from "../../../lib/ddd/repository/IdentifiedRepository";
import {ErrorModel} from "../models/ErrorModel";
import {ErrorId} from "../models/ErrorId";
import {ErrorCreateRequestModel} from "../models/ErrorCreateRequestModel";
import {CreateError} from "../../common/errors/CreateError";
import {Either} from "../../../lib/ddd/valueobject/Either";

export interface ErrorRepository extends IdentifiedRepository<ErrorModel, ErrorId, number> {
    createError: (request: ErrorCreateRequestModel) => Promise<Either<CreateError, ErrorModel>>;
}