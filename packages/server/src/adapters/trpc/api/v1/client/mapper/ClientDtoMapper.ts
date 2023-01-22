import {ClientModel} from "../../../../../../domain/client/models/ClientModel";
import {ClientDto} from "../dto/ClientDto";
import {ClientNavigatorDtoMapper} from "../../clientnavigator/mapper/ClientNavigatorDtoMapper";
import {DateUtils} from "../../../../../../utils/date/DateUtils";

export class ClientDtoMapper {

    public static toClientDto(client: ClientModel): ClientDto {
        const clientNavigator = (
            client.clientNavigator
                ? ClientNavigatorDtoMapper.toClientNavigatorDto(client.clientNavigator)
                : null
        );

        return {
            id: client.id().value(),
            uuid: client.uuid,
            clientNavigator: clientNavigator,
            creationDatetime: DateUtils.toStringDatetime(client.creationDatetime),
        }
    }

}