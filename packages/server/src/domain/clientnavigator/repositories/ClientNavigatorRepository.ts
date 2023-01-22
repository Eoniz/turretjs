import {IdentifiedRepository} from "../../../lib/ddd/repository/IdentifiedRepository";
import {ClientNavigatorModel} from "../models/ClientNavigatorModel";
import {ClientNavigatorId} from "../models/ClientNavigatorId";
import {ClientNavigatorCreateRequestModel} from "../models/ClientNavigatorCreateRequestModel";
import {CreateError} from "../../common/errors/CreateError";
import {Either} from "../../../lib/ddd/valueobject/Either";

export interface ClientNavigatorRepository extends IdentifiedRepository<ClientNavigatorModel, ClientNavigatorId, number> {
    insert: (clientNavigator: ClientNavigatorCreateRequestModel) => Promise<Either<CreateError, ClientNavigatorModel>>;
}