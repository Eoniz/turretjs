import {TurretError} from "./TurretError";

export class CreateError extends TurretError {
    constructor(msg: string) {
        super(msg);
    }
}