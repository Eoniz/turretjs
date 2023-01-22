import {ProjectService} from "../services/ProjectService";
import {ProjectRepository} from "../repository/ProjectRepository";
import {ProjectRepositoryImpl} from "../repository/ProjectRepositoryImpl";
import {CreateProjectUseCase} from "../usecases/CreateProjectUseCase";
import {GetProjectByIdUseCase} from "../usecases/GetProjectByIdUseCase";
import {GetProjectByNameUseCase} from "../usecases/GetProjectByNameUseCase";

export function provideProjectService(): ProjectService {
    const projectRepository: ProjectRepository = new ProjectRepositoryImpl();

    const getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository);
    const getProjectByNameUseCase = new GetProjectByNameUseCase(projectRepository);
    const createProjectUseCase = new CreateProjectUseCase(projectRepository);

    return new ProjectService(
        getProjectByIdUseCase,
        getProjectByNameUseCase,
        createProjectUseCase
    );
}
