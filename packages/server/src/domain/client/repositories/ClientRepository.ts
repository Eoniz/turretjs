import {IdentifiedRepository} from "../../../lib/ddd/repository/IdentifiedRepository";
import {ClientModel} from "../models/ClientModel";
import {ClientId} from "../models/ClientId";
import {NotFoundError} from "../../common/errors/NotFoundError";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {ClientCreateRequestModel} from "../models/ClientCreateRequestModel";
import {CreateError} from "../../common/errors/CreateError";

export interface ClientRepository extends IdentifiedRepository<ClientModel, ClientId, number> {
    findClientByUuid: (uuid: string) => Promise<Either<NotFoundError, ClientModel>>;
    createClient: (request: ClientCreateRequestModel) => Promise<Either<CreateError, ClientModel>>;
}