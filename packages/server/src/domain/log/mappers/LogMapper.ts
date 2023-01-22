import {Log, ClientSession} from "@prisma/client";
import {LogModel} from "../models/LogModel";
import {LogId} from "../models/LogId";
import {LogTypeMapper} from "../../logtype/mappers/LogTypeMapper";
import {ClientSessionId} from "../../clientsession/models/ClientSessionId";
import moment from "moment";
import {ClientSessionMapper} from "../../clientsession/mappers/ClientSessionMapper";

export class LogMapper {

    public static fromLog(
        log: (
            Log
                & { client_session?: ClientSession | null }
        )
    ): LogModel {
        const logType = LogTypeMapper.fromLogTypeId(log.log_type_id);
        const clientSession = (
            log.client_session
                ? ClientSessionMapper.fromClientSession(log.client_session)
                : null
        )

        return new LogModel(
            LogId.of(log.id),
            log.log,
            logType.id(),
            ClientSessionId.of(log.client_session_id),
            moment(log.creation_datetime),
            clientSession
        );
    }

}