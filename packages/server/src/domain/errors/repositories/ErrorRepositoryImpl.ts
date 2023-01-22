import {ErrorRepository} from "./ErrorRepository";
import prismaClient from "../../../adapters/persistence/prisma/prismaClient";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {CreateError} from "../../common/errors/CreateError";
import {ErrorMapper} from "../mappers/ErrorMapper";
import {ErrorModel} from "../models/ErrorModel";
import {ErrorId} from "../models/ErrorId";
import {ErrorCreateRequestModel} from "../models/ErrorCreateRequestModel";

export class ErrorRepositoryImpl implements ErrorRepository {
    public async findAll(): Promise<Array<ErrorModel>> {
        try {
            const errors = await prismaClient.error.findMany({
                include: {
                    client_session: true
                }
            });

            return errors.map(ErrorMapper.fromError);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async findById(id: ErrorId): Promise<Either<null, ErrorModel>> {
        try {
            const error = await prismaClient.error.findFirst({
                where: {
                    id: id.value()
                },
                include: {
                    client_session: true
                }
            });

            if (!error) {
                return Either.left(null);
            }

            const mappedError = ErrorMapper.fromError(error);
            return Either.right(mappedError);
        } catch (e) {
            console.error(e);
            return Either.left(null);
        }
    }

    public async createError(createRequest: ErrorCreateRequestModel): Promise<Either<CreateError, ErrorModel>> {
        try {
            const error = await prismaClient.error.create({
                data: {
                    message: createRequest.message,
                    lineno: createRequest.lineno,
                    colno: createRequest.colno,
                    filename: createRequest.filename,
                    client_session_id: createRequest.clientSessionId.value(),
                },
                include: {
                    client_session: true,
                }
            });

            const mappedError = ErrorMapper.fromError(error);
            return Either.right(mappedError);
        } catch (e) {
            console.error(e);
            return Either.left(new CreateError(`Unable to create Error: ${e}`));
        }
    }
}