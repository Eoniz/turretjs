import {GetProjectByIdUseCase} from "../usecases/GetProjectByIdUseCase";
import {GetProjectByNameUseCase} from "../usecases/GetProjectByNameUseCase";
import {CreateProjectUseCase} from "../usecases/CreateProjectUseCase";
import {ProjectId} from "../models/ProjectId";
import {ProjectCreateRequestModel} from "../models/ProjectCreateRequestModel";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {ProjectModel} from "../models/ProjectModel";
import {ProjectVersionCreateRequestModel} from "../../projectversion/models/ProjectVersionCreateRequestModel";
import {ProjectVersionService} from "../../projectversion/services/ProjectVersionService";
import {provideProjectVersionService} from "../../projectversion/dependency/ProjectVersionDependencyInjector";

export class ProjectService {

    private readonly _projectVersionService: ProjectVersionService;

    constructor(
        private readonly _getProjectByIdUseCase: GetProjectByIdUseCase,
        private readonly _getProjectByNameUseCase: GetProjectByNameUseCase,
        private readonly _createProjectUseCase: CreateProjectUseCase
    ) {
        this._projectVersionService = provideProjectVersionService();
    }

    public async getProjectById(id: number): Promise<Either<null, ProjectModel>>;
    public async getProjectById(id: ProjectId): Promise<Either<null, ProjectModel>>;

    public async getProjectById(id: ProjectId | number) {
        let _id = (typeof id === 'number' ? ProjectId.of(id) : id);
        return await this._getProjectByIdUseCase.execute(_id);
    }

    public async getProjectByName(name: string) {
        return await this._getProjectByNameUseCase.execute(name);
    }

    public async createProject(request: ProjectCreateRequestModel): Promise<ProjectModel>;
    public async createProject(request: ProjectCreateRequestModel, versionRequest: ProjectVersionCreateRequestModel): Promise<ProjectModel>;
    public async createProject(request: ProjectCreateRequestModel, versionName: string): Promise<ProjectModel>;

    public async createProject(request: ProjectCreateRequestModel, versionRequest?: string | ProjectVersionCreateRequestModel) {
        const maybeProject = await this._createProjectUseCase.execute(request);

        if (maybeProject.isLeft()) {
            throw maybeProject.getLeft();
        }

        const project = maybeProject.getRight();

        if (!versionRequest) {
            return project;
        }

        const _versionRequest = (
            typeof versionRequest === 'string'
                ? new ProjectVersionCreateRequestModel(versionRequest, project.id())
                : versionRequest
        );

        if (project.versions.some((_version) => _version.isVersionEqualToName(_versionRequest.name))) {
            return project;
        }

        const maybeVersion = await this._projectVersionService.createProjectVersion(_versionRequest);

        if (maybeVersion.isLeft()) {
            throw maybeVersion.getLeft();
        }

        const version = maybeVersion.getRight();
        project.versions = [...project.versions, version]

        return project;
    }
}