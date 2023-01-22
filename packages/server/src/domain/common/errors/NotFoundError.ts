import {TurretError} from "./TurretError";

export class NotFoundError extends TurretError {
    constructor(msg: string) {
        super(msg);
    }
}