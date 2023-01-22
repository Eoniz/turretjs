import {Client, ClientSession, Log, Error} from "@prisma/client";
import {ClientSessionModel} from "../models/ClientSessionModel";
import {ClientMapper} from "../../client/mappers/ClientMapper";
import {ClientId} from "../../client/models/ClientId";
import {ClientSessionId} from "../models/ClientSessionId";
import moment from "moment";
import {LogMapper} from "../../log/mappers/LogMapper";
import {ErrorMapper} from "../../errors/mappers/ErrorMapper";

export class ClientSessionMapper {

    public static fromClientSession(
        clientSession: (
            ClientSession
                & { client?: Client | null }
                & { logs?: Array<Log> | null }
                & { errors?: Array<Error> | null }
        )
    ): ClientSessionModel {
        const client = (
            clientSession.client
                ? ClientMapper.fromClient(clientSession.client)
                : null
        );

        const logs = (
            clientSession.logs
                ? clientSession.logs.map(LogMapper.fromLog)
                : []
        );

        const errors = (
            clientSession.errors
                ? clientSession.errors.map(ErrorMapper.fromError)
                : []
        );

        return new ClientSessionModel(
            ClientSessionId.of(clientSession.id),
            ClientId.of(clientSession.client_id),
            clientSession.uuid,
            moment(clientSession.creation_datetime),
            client,
            logs,
            errors,
        );
    }

}