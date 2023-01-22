import {ProjectVersionService} from "../services/ProjectVersionService";
import {ProjectVersionRepository} from "../repository/ProjectVersionRepository";
import {ProjectVersionRepositoryImpl} from "../repository/ProjectVersionRepositoryImpl";
import {CreateProjectVersionUseCase} from "../usecases/CreateProjectVersionUseCase";

export function provideProjectVersionService(): ProjectVersionService {
    const projectVersionRepository: ProjectVersionRepository = new ProjectVersionRepositoryImpl();

    const createProjectVersionUseCase = new CreateProjectVersionUseCase(projectVersionRepository);

    return new ProjectVersionService(
        createProjectVersionUseCase
    );
}