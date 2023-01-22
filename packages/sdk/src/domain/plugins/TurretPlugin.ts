import {TurretContext} from "../../lib/context/TurretContext";

export abstract class TurretPlugin {

    protected _turretContext!: TurretContext;

    constructor() {
    }

    public bindTurretContext(turretContext: TurretContext) {
        this._turretContext = turretContext;
    }

    public get turretContext() {
        return this._turretContext;
    }

    public abstract initialize(): void;
}