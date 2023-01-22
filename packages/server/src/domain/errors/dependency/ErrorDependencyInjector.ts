import {ErrorService} from "../services/ErrorService";
import {ErrorRepository} from "../repositories/ErrorRepository";
import {ErrorRepositoryImpl} from "../repositories/ErrorRepositoryImpl";
import {CreateErrorUseCase} from "../usecases/CreateErrorUseCase";

export function provideErrorService(): ErrorService {
    const errorRepository: ErrorRepository = new ErrorRepositoryImpl();

    const createErrorUseCase = new CreateErrorUseCase(errorRepository);

    return new ErrorService(
        createErrorUseCase
    );
}