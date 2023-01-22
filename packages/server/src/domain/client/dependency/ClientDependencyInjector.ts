import {ClientService} from "../services/ClientService";
import {ClientRepositoryImpl} from "../repositories/ClientRepositoryImpl";
import {ClientRepository} from "../repositories/ClientRepository";
import {FindClientByUuidUseCase} from "../usecases/FindClientByUuidUseCase";
import {CreateClientUseCase} from "../usecases/CreateClientUseCase";

export function provideClientService(): ClientService {
    const clientRepository: ClientRepository = new ClientRepositoryImpl();

    const findClientByUuidUseCase = new FindClientByUuidUseCase(clientRepository);
    const createClientUseCase = new CreateClientUseCase(clientRepository);

    const clientService = new ClientService(
        findClientByUuidUseCase,
        createClientUseCase,
    );

    return clientService;
}

