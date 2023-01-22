import {trpc} from "../../../trpc";
import {GetOrCreateProjectCommandSchema} from "./command/GetOrCreateProjectCommand";
import {ProjectDtoSchema} from "./dto/ProjectDto";
import {provideProjectService} from "../../../../../domain/project/dependency/ProjectDependencyInjector";
import {ProjectCreateRequestModel} from "../../../../../domain/project/models/ProjectCreateRequestModel";
import {ProjectDtoMapper} from "./mapper/ProjectDtoMapper";
import {
    provideProjectVersionService
} from "../../../../../domain/projectversion/dependency/ProjectVersionDependencyInjector";
import {
    ProjectVersionCreateRequestModel
} from "../../../../../domain/projectversion/models/ProjectVersionCreateRequestModel";

const projectService = provideProjectService();
const projectVersionService = provideProjectVersionService();

export const projectRouter = trpc.router({
    getOrCreateProject: trpc.procedure
        .meta({openapi: {method: 'POST', path: '/v1/projects/get-or-create', tags: ['Projects']}})
        .input(GetOrCreateProjectCommandSchema)
        .output(ProjectDtoSchema)
        .mutation(async ({input}) => {
            const maybeProject = await projectService.getProjectByName(input.name);

            if (maybeProject.isRight()) {
                const foundProject = maybeProject.getRight();

                if (!input.version) {
                    return ProjectDtoMapper.toProjectDto(foundProject);
                }

                if (!foundProject.versions.some((_version) => _version.isVersionEqualToName(input.version))) {
                    const projectVersionCreateModel = new ProjectVersionCreateRequestModel(
                        input.version,
                        foundProject.id()
                    );

                    const maybeVersion = await projectVersionService.createProjectVersion(projectVersionCreateModel);

                    if (maybeVersion.isLeft()) {
                        throw maybeVersion.getLeft();
                    }

                    foundProject.versions = [
                        ...foundProject.versions,
                        maybeVersion.get()
                    ];
                }

                foundProject.versions = foundProject.versions.filter((_version) => {
                    return _version.isVersionEqualToName(input.version);
                });

                return ProjectDtoMapper.toProjectDto(foundProject);
            }

            const projectCreateRequestModel = new ProjectCreateRequestModel(
                input.name
            );

            const project = (
                await projectService.createProject(projectCreateRequestModel, input.version ?? "1.0.0")
            );

            return ProjectDtoMapper.toProjectDto(project);
        })
})

export type ProjectRouter = typeof projectRouter;
