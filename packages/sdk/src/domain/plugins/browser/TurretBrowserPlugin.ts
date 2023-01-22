import {TurretPlugin} from "../TurretPlugin";

export class TurretBrowserPlugin extends TurretPlugin {


    public initialize() {
        window.addEventListener('error', this.onError.bind(this));
    }

    private onError(error: ErrorEvent) {
        console.error({
            error: error,
            turret: this._turretContext
        });
    }
}