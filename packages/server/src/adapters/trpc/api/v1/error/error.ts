import {trpc} from "../../../trpc";
import {CreateErrorCommandSchema} from "./command/CreateErrorCommand";
import {ErrorDtoSchema} from "./dto/ErrorDto";
import {provideErrorService} from "../../../../../domain/errors/dependency/ErrorDependencyInjector";
import {ErrorCreateRequestModel} from "../../../../../domain/errors/models/ErrorCreateRequestModel";
import {ClientSessionId} from "../../../../../domain/clientsession/models/ClientSessionId";
import {ErrorDtoMapper} from "./mapper/ErrorDtoMapper";

const errorService = provideErrorService();

export const errorRouter = trpc.router({
    createError: trpc.procedure
        .meta({ openapi: { method: 'POST', path: '/v1/errors', tags: ['Errors'] } })
        .input(CreateErrorCommandSchema)
        .output(ErrorDtoSchema)
        .mutation(async ({ input }) => {
            const errorCreateRequestModel = new ErrorCreateRequestModel(
                input.message,
                input.lineno,
                input.colno,
                input.filename,
                ClientSessionId.of(input.clientSessionId)
            );

            const errorModel = await errorService.createError(errorCreateRequestModel);
            return ErrorDtoMapper.toErrorDto(errorModel);
        })
});

export type ErrorRouter = typeof errorRouter;
