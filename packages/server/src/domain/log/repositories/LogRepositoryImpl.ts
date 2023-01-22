import {LogRepository} from "./LogRepository";
import prismaClient from "../../../adapters/persistence/prisma/prismaClient";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {CreateError} from "../../common/errors/CreateError";
import {LogCreateRequestModel} from "../models/LogCreateRequestModel";
import {LogModel} from "../models/LogModel";
import {LogMapper} from "../mappers/LogMapper";
import {LogId} from "../models/LogId";

export class LogRepositoryImpl implements LogRepository {
    public async findAll(): Promise<Array<LogModel>> {
        try {
            const logs = await prismaClient.log.findMany({
                include: {
                    client_session: true,
                }
            });

            return logs.map(LogMapper.fromLog);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async findById(id: LogId): Promise<Either<null, LogModel>> {
        try {
            const log = await prismaClient.log.findFirst({
                where: {
                    id: id.value()
                },
                include: {
                    client_session: true,
                }
            });

            if (!log) {
                return Either.left(null);
            }

            const mappedLog = LogMapper.fromLog(log);
            return Either.right(mappedLog);
        } catch (e) {
            console.error(e);
            return Either.left(null);
        }
    }

    public async createLog(createRequest: LogCreateRequestModel): Promise<Either<CreateError, LogModel>> {
        try {
            const log = await prismaClient.log.create({
                data: {
                    log: createRequest.log,
                    log_type_id: createRequest.logType.id().value(),
                    client_session_id: createRequest.clientSessionId.value()
                },
                include: {
                    client_session: true,
                }
            });

            const mappedLog = LogMapper.fromLog(log);
            return Either.right(mappedLog);
        } catch (e) {
            console.error(e);
            return Either.left(new CreateError(`Unable to create Log: ${e}`));
        }
    }
}