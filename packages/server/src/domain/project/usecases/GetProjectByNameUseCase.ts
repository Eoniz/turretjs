import {ProjectRepository} from "../repository/ProjectRepository";

export class GetProjectByNameUseCase {

    constructor(
        private readonly _projectRepository: ProjectRepository
    ) {
    }

    public async execute(name: string) {
        return await this._projectRepository.findProjectByName(name);
    }

}