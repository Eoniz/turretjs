import {TurretContext} from "../../../lib/context/TurretContext";
// @ts-ignore
import { v4 as uuidV4 } from "uuid";

export class ProjectService {

    constructor(
        private readonly _turret: TurretContext,
    ) {
    }

    public async declareProject(projectName: string, projectVersion: string) {
        console.log(projectName, projectVersion);
        const project = await this._turret.trpcClient.getOrCreateProject.mutate({
            name: projectName,
            version: projectVersion
        });

        console.log(project);

        localStorage.setItem(`@turretjs/project/${projectName}/${projectVersion}/id`, project.id.toString());
        localStorage.setItem(`@turretjs/project/${projectName}/${projectVersion}/creationDatetime`, project.creationDatetime);

        return project;
    }

}