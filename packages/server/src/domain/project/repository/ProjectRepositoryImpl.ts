import {ProjectRepository} from "./ProjectRepository";
import prismaClient from "../../../adapters/persistence/prisma/prismaClient";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {CreateError} from "../../common/errors/CreateError";
import {ProjectModel} from "../models/ProjectModel";
import {ProjectMapper} from "../mappers/ProjectMapper";
import {ProjectId} from "../models/ProjectId";
import {ProjectCreateRequestModel} from "../models/ProjectCreateRequestModel";
import {NotFoundError} from "../../common/errors/NotFoundError";

export class ProjectRepositoryImpl implements ProjectRepository {
    public async findAll() {
        try {
            const projects = await prismaClient.project.findMany({
                include: {
                    versions: true
                }
            });

            return projects.map(ProjectMapper.fromProject);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async findById(id: ProjectId): Promise<Either<null, ProjectModel>> {
        try {
            const project = await prismaClient.project.findFirst({
                where: {
                    id: id.value()
                },
                include: {
                    versions: true
                }
            });

            if (!project) {
                return Either.left(null);
            }

            const mappedProject = ProjectMapper.fromProject(project);
            return Either.right(mappedProject);
        } catch (e) {
            console.error(e);
            return Either.left(null);
        }
    }

    public async findProjectByName(name: string): Promise<Either<NotFoundError, ProjectModel>> {
        try {
            const project = await prismaClient.project.findFirst({
                where: {
                    name: name.toLowerCase().trim()
                },
                include: {
                    versions: true
                }
            });

            if (!project) {
                return Either.left(new NotFoundError(`Project with name "${name}" not found`));
            }

            const mappedProject = ProjectMapper.fromProject(project);
            return Either.right(mappedProject);
        } catch (e) {
            console.error(e);
            return Either.left(new NotFoundError(`Unable to find project due to error: ${e}`));
        }
    }

    public async createProject(request: ProjectCreateRequestModel): Promise<Either<CreateError, ProjectModel>> {
        try {
            const project = await prismaClient.project.create({
                data: {
                    name: request.name.toLowerCase()
                },
                include: {
                    versions: true,
                }
            });

            const mappedProject = ProjectMapper.fromProject(project);
            return Either.right(mappedProject);
        } catch (e) {
            console.error(e);
            return Either.left(new CreateError(`Unable to create Project Version: ${e}`));
        }
    }
}