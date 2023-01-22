import {TurretContext} from "../../../lib/context/TurretContext";
import { v4 as uuidV4 } from "uuid";

export class ClientSessionService {

    constructor(
        private readonly _turretContext: TurretContext,
    ) {
    }

    public async declareSession(clientId: number) {
        const sessionUuid = uuidV4();
        localStorage.setItem("@turretjs/session/uuid", sessionUuid);

        return await this._turretContext.trpcClient.getOrCreateClientSession.mutate({
            uuid: sessionUuid,
            clientId: clientId,
        });
    }

}