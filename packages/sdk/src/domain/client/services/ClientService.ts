import {TurretContext} from "../../../lib/context/TurretContext";
// @ts-ignore
import { v4 as uuidV4 } from "uuid";

export class ClientService {

    constructor(
        private readonly _turret: TurretContext,
    ) {
    }

    public async declareClient() {
        let uuid = localStorage.getItem("@turretjs/client/uuid");
        if (!uuid) {
            uuid = uuidV4() as string;
            localStorage.setItem("@turretjs/client/uuid", uuid);
        }

        return await this._turret.trpcClient.getOrCreateClient.mutate({
            uuid: uuid,
            navigator: {
                vendor: window.navigator.vendor,
                platform: window.navigator.platform,
                userAgent: window.navigator.userAgent,
                appVersion: window.navigator.appVersion,
                appName: window.navigator.appName,
                appCodeName: window.navigator.appCodeName
            }
        })
    }

}