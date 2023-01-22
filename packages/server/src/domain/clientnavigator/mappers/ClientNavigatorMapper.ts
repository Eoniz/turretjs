import {Client, ClientNavigator} from "@prisma/client";
import {ClientNavigatorModel} from "../models/ClientNavigatorModel";
import {ClientNavigatorId} from "../models/ClientNavigatorId";
import {ClientId} from "../../client/models/ClientId";
import {ClientMapper} from "../../client/mappers/ClientMapper";
import moment from "moment";

export class ClientNavigatorMapper {

    public static fromClientNavigator(clientNavigator: ClientNavigator & { client?: Client | null }): ClientNavigatorModel {
        const client = (
            clientNavigator.client
                ? ClientMapper.fromClient(clientNavigator.client)
                : null
        );

        return new ClientNavigatorModel(
            ClientNavigatorId.of(clientNavigator.id),
            clientNavigator.app_code_name,
            clientNavigator.app_name,
            clientNavigator.app_version,
            clientNavigator.user_agent,
            clientNavigator.vendor,
            clientNavigator.platform,
            ClientId.of(clientNavigator.client_id),
            moment(clientNavigator.creation_datetime),
            client,
        )
    }

}