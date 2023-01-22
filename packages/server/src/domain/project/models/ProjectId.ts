import {Id} from "../../../lib/ddd/entity/Id";

export class ProjectId implements Id<number> {
    constructor(
        private readonly _id: number
    ) {
    }

    public static of(id: number) {
        return new ProjectId(id);
    }

    public value() {
        return this._id;
    }

    public get id() {
        return this._id;
    }

}