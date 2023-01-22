import {ClientSessionService} from "../services/ClientSessionService";
import {ClientSessionRepository} from "../repositories/ClientSessionRepository";
import {ClientSessionRepositoryImpl} from "../repositories/ClientSessionRepositoryImpl";
import {CreateClientSessionUseCase} from "../usecases/CreateClientSessionUseCase";

export function provideClientSessionService(): ClientSessionService {
    const clientSessionRepository: ClientSessionRepository = new ClientSessionRepositoryImpl();

    const createClientSessionUseCase = new CreateClientSessionUseCase(clientSessionRepository);

    return new ClientSessionService(
        createClientSessionUseCase
    );
}