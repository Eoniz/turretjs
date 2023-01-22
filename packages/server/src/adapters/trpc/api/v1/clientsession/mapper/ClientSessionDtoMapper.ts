import {ClientSessionModel} from "../../../../../../domain/clientsession/models/ClientSessionModel";
import {ClientSessionDto} from "../dto/ClientSessionDto";
import {DateUtils} from "../../../../../../utils/date/DateUtils";

export class ClientSessionDtoMapper {

    public static toClientSessionDto(clientSession: ClientSessionModel): ClientSessionDto {
        return {
            uuid: clientSession.uuid,
            id: clientSession.id().value(),
            clientId: clientSession.clientId.value(),
            creationDatetime: DateUtils.toStringDatetime(clientSession.creationDatetime)
        };
    }

}