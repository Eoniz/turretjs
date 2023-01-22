import {ClientNavigatorService} from "../services/ClientNavigatorService";
import {ClientNavigatorRepository} from "../repositories/ClientNavigatorRepository";
import {ClientNavigatorRepositoryImpl} from "../repositories/ClientNavigatorRepositoryImpl";
import {CreateClientNavigatorUseCase} from "../usecases/CreateClientNavigatorUseCase";


export function providerClientNavigatorService(): ClientNavigatorService {
    const clientNavigatorRepository: ClientNavigatorRepository = new ClientNavigatorRepositoryImpl();

    const createClientNavigatorUseCase = new CreateClientNavigatorUseCase(clientNavigatorRepository);

    return new ClientNavigatorService(
        createClientNavigatorUseCase
    );
}