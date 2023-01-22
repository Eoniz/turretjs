import {ProjectRepository} from "../repository/ProjectRepository";
import {ProjectId} from "../models/ProjectId";

export class GetProjectByIdUseCase {

    constructor(
        private readonly _projectRepository: ProjectRepository
    ) {
    }

    public async execute(id: ProjectId) {
        return await this._projectRepository.findById(id);
    }

}