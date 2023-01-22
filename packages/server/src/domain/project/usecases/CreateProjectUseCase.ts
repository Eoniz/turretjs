import {ProjectRepository} from "../repository/ProjectRepository";
import {ProjectCreateRequestModel} from "../models/ProjectCreateRequestModel";

export class CreateProjectUseCase {

    constructor(
        private readonly _projectRepository: ProjectRepository
    ) {
    }

    public async execute(request: ProjectCreateRequestModel) {
        return await this._projectRepository.createProject(request);
    }

}