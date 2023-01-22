import {ProjectVersionRepository} from "./ProjectVersionRepository";
import prismaClient from "../../../adapters/persistence/prisma/prismaClient";
import {Either} from "../../../lib/ddd/valueobject/Either";
import {ProjectVersionMapper} from "../mappers/ProjectVersionMapper";
import {ProjectVersionModel} from "../models/ProjectVersionModel";
import {ProjectVersionId} from "../models/ProjectVersionId";
import {ProjectVersionCreateRequestModel} from "../models/ProjectVersionCreateRequestModel";
import {CreateError} from "../../common/errors/CreateError";

export class ProjectVersionRepositoryImpl implements ProjectVersionRepository {
    public async findAll() {
        try {
            const projectVersions = await prismaClient.projectVersion.findMany({
                include: {
                    project: true
                }
            });

            return projectVersions.map(ProjectVersionMapper.fromProjectVersion);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async findById(id: ProjectVersionId): Promise<Either<null, ProjectVersionModel>> {
        try {
            const projectVersion = await prismaClient.projectVersion.findFirst({
                where: {
                    id: id.value()
                },
                include: {
                    project: true
                }
            });

            if (!projectVersion) {
                return Either.left(null);
            }

            const mappedProjectVersion = ProjectVersionMapper.fromProjectVersion(projectVersion);
            return Either.right(mappedProjectVersion);
        } catch (e) {
            console.error(e);
            return Either.left(null);
        }
    }

    public async createProjectVersion(request: ProjectVersionCreateRequestModel): Promise<Either<CreateError, ProjectVersionModel>> {
        try {
            const projectVersion = await prismaClient.projectVersion.create({
                data: {
                    name: request.name,
                    project_id: request.projectId.value()
                },
                include: {
                    project: true
                }
            });

            const mappedProjectVersion = ProjectVersionMapper.fromProjectVersion(projectVersion);
            return Either.right(mappedProjectVersion);
        } catch (e) {
            console.error(e);
            return Either.left(new CreateError(`Unable to create Project Version: ${e}`));
        }
    }
}