import {CreateProjectVersionUseCase} from "../usecases/CreateProjectVersionUseCase";
import {ProjectVersionCreateRequestModel} from "../models/ProjectVersionCreateRequestModel";

export class ProjectVersionService {

    constructor(
        private readonly _createProjectVersionUseCase: CreateProjectVersionUseCase,
    ) {
    }

    public async createProjectVersion(request: ProjectVersionCreateRequestModel) {
        return await this._createProjectVersionUseCase.execute(request);
    }
}