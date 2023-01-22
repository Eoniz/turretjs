import {ProjectVersionRepository} from "../repository/ProjectVersionRepository";
import {ProjectVersionCreateRequestModel} from "../models/ProjectVersionCreateRequestModel";

export class CreateProjectVersionUseCase {

    constructor(
        private readonly _projectVersionRepository: ProjectVersionRepository
    ) {
    }

    public async execute(request: ProjectVersionCreateRequestModel) {
        return await this._projectVersionRepository.createProjectVersion(request);
    }

}