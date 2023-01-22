import {LogService} from "../services/LogService";
import {LogRepository} from "../repositories/LogRepository";
import {LogRepositoryImpl} from "../repositories/LogRepositoryImpl";
import {CreateLogUseCase} from "../usecases/CreateLogUseCase";


export function provideLogService(): LogService {
    const logRepository: LogRepository = new LogRepositoryImpl();

    const createLogUseCase = new CreateLogUseCase(logRepository);

    return new LogService(
        createLogUseCase,
    );
}