import {IdentifiedRepository} from "../../../lib/ddd/repository/IdentifiedRepository";
import {LogModel} from "../models/LogModel";
import {LogId} from "../models/LogId";
import {LogCreateRequestModel} from "../models/LogCreateRequestModel";
import {CreateError} from "../../common/errors/CreateError";
import {Either} from "../../../lib/ddd/valueobject/Either";

export interface LogRepository extends IdentifiedRepository<LogModel, LogId, number> {
    createLog: (request: LogCreateRequestModel) => Promise<Either<CreateError, LogModel>>;
}