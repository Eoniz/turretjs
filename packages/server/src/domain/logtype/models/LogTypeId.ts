import {Id} from "../../../lib/ddd/entity/Id";
import {LogTypeIdVisitor} from "../visitors/LogTypeIdVisitor";

export class LogTypeId implements Id<number> {

    public static readonly LOG_ID = new LogTypeId(1, (visitor) => visitor.log());
    public static readonly DEBUG_ID = new LogTypeId(2, (visitor) => visitor.debug());
    public static readonly WARNING_ID = new LogTypeId(3, (visitor) => visitor.warning());
    public static readonly ERROR_ID = new LogTypeId(4, (visitor) => visitor.error());
    public static readonly TRACE_ID = new LogTypeId(5, (visitor) => visitor.trace());

    private constructor(
        private readonly _id: number,
        private readonly _accept: <R> (visitor: LogTypeIdVisitor<R>) => R,
    ) {
    }

    public get id() {
        return this._id;
    }

    public value() {
        return this._id;
    }

    public accept<R>(visitor: LogTypeIdVisitor<R>) {
        return this._accept(visitor);
    }
}