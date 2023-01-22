import {TurretContext} from "./context/TurretContext";
import {TurretPlugin} from "../domain/plugins/TurretPlugin";

export interface TurretOptions {
    baseUrl: string;
    project: string;
    projectVersion: string;
    plugins: Array<TurretPlugin>;
}

const defaultOptions = Object.freeze<TurretOptions>({
   baseUrl: "http://localhost:3000/api/trpc",
    project: "my-project",
    projectVersion: "v1.0.0",
    plugins: [],
});

export function initializeTurret(opts?: Partial<TurretOptions>) {
    const options = Object.assign({}, defaultOptions, opts);

    const turretContext = new TurretContext(options);
    (window as any).turret = turretContext;

    for (const plugin of options.plugins) {
        plugin.bindTurretContext(turretContext);
        plugin.initialize();
    }

    console.log("Turret is initialized 🟢");
}
