import {ClientNavigatorDto} from "../dto/ClientNavigatorDto";
import {ClientNavigatorModel} from "../../../../../../domain/clientnavigator/models/ClientNavigatorModel";
import {DateUtils} from "../../../../../../utils/date/DateUtils";

export class ClientNavigatorDtoMapper {

    public static toClientNavigatorDto(clientNavigator: ClientNavigatorModel): ClientNavigatorDto {
        return {
            id: clientNavigator.id().value(),
            appName: clientNavigator.appName,
            clientId: clientNavigator.clientId.value(),
            vendor: clientNavigator.vendor,
            platform: clientNavigator.platform,
            userAgent: clientNavigator.userAgent,
            appVersion: clientNavigator.appVersion,
            appCodeName: clientNavigator.appCodeName,
            creationDatetime: DateUtils.toStringDatetime(clientNavigator.creationDatetime),
        }
    }

}