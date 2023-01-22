import {Client, ClientNavigator, ClientSession} from "@prisma/client"
import {ClientModel} from "../models/ClientModel";
import {ClientId} from "../models/ClientId";
import {ClientNavigatorMapper} from "../../clientnavigator/mappers/ClientNavigatorMapper";
import moment from "moment";
import {ClientSessionMapper} from "../../clientsession/mappers/ClientSessionMapper";

export class ClientMapper {

    public static fromClient(
        client: (
            Client
                & { client_navigator?: null | ClientNavigator }
                & { client_sessions?: null | Array<ClientSession> }
        )
    ): ClientModel {
        const clientNavigator = (
            client.client_navigator
                ? ClientNavigatorMapper.fromClientNavigator(client.client_navigator)
                : null
        );

        const clientSessions = (
            client.client_sessions
                ? client.client_sessions.map(ClientSessionMapper.fromClientSession)
                : []
        );

        return new ClientModel(
            ClientId.of(client.id),
            client.uuid,
            moment(client.creation_datetime),
            clientNavigator,
            clientSessions
        );
    }

}