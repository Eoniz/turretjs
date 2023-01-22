import {Error, ClientSession} from "@prisma/client";
import {ErrorModel} from "../models/ErrorModel";
import {ErrorId} from "../models/ErrorId";
import {ClientSessionId} from "../../clientsession/models/ClientSessionId";
import moment from "moment";
import {ClientSessionMapper} from "../../clientsession/mappers/ClientSessionMapper";

export class ErrorMapper {

    public static fromError(
        error: (
            Error
                & { client_session?: ClientSession | null }
        )
    ): ErrorModel {

        const clientSession = (
            error.client_session
                ? ClientSessionMapper.fromClientSession(error.client_session)
                : null
        );

        return new ErrorModel(
            ErrorId.of(error.id),
            error.message,
            error.lineno,
            error.colno,
            error.filename,
            ClientSessionId.of(error.client_session_id),
            moment(error.creation_datetime),
            clientSession
        );
    }

}