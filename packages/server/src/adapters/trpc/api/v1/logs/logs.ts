import {trpc} from "../../../trpc";
import {provideLogService} from "../../../../../domain/log/dependency/LogDependencyInjector";
import {CreateLogCommandSchema} from "./command/CreateLogCommand";
import {LogDtoSchema} from "./dto/LogDto";
import {LogCreateRequestModel} from "../../../../../domain/log/models/LogCreateRequestModel";
import {LogTypeMapper} from "../../../../../domain/logtype/mappers/LogTypeMapper";
import {ClientSessionId} from "../../../../../domain/clientsession/models/ClientSessionId";
import {LogDtoMapper} from "./mapper/LogDtoMapper";

const logService = provideLogService();

export const logsRouter = trpc.router({
    createLog: trpc.procedure
        .meta({ openapi: { method: "POST", path: "/v1/logs", tags: ['Logs'] } })
        .input(CreateLogCommandSchema)
        .output(LogDtoSchema)
        .mutation(async ({ input }) => {
            const request = new LogCreateRequestModel(
                input.log,
                LogTypeMapper.fromLogTypeId(input.logType),
                ClientSessionId.of(input.clientSessionId)
            );

            const log = await logService.createLog(request);
            return LogDtoMapper.fromLog(log);
        })
});

export type LogsRouter = typeof logsRouter;
