import {IdentifiedRepository} from "../../../lib/ddd/repository/IdentifiedRepository";
import {ClientSessionModel} from "../models/ClientSessionModel";
import {ClientSessionId} from "../models/ClientSessionId";
import {ClientSessionCreateRequestModel} from "../models/ClientSessionCreateRequestModel";
import {CreateError} from "../../common/errors/CreateError";
import {Either} from "../../../lib/ddd/valueobject/Either";

export interface ClientSessionRepository extends IdentifiedRepository<ClientSessionModel, ClientSessionId, number>{
    createClientSession: (request: ClientSessionCreateRequestModel) => Promise<Either<CreateError, ClientSessionModel>>;
}
