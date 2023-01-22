import {Client, ClientSession} from "@prisma/client";
import {ClientSessionModel} from "../models/ClientSessionModel";
import {ClientMapper} from "../../client/mappers/ClientMapper";
import {ClientId} from "../../client/models/ClientId";
import {ClientSessionId} from "../models/ClientSessionId";
import moment from "moment";

export class ClientSessionMapper {

    public static fromClientSession(clientSession: ClientSession & { client?: Client | null }): ClientSessionModel {
        const client = (
            clientSession.client
                ? ClientMapper.fromClient(clientSession.client)
                : null
        );

        return new ClientSessionModel(
            ClientSessionId.of(clientSession.id),
            ClientId.of(clientSession.client_id),
            clientSession.uuid,
            moment(clientSession.creation_datetime),
            client
        );
    }

}