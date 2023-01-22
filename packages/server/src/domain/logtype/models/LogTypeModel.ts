import {LogTypeVisitor} from "../visitors/LogTypeVisitor";
import {IdentifiedEntity} from "../../../lib/ddd/entity/IdentifiedEntity";
import {LogTypeId} from "./LogTypeId";

export class LogTypeModel implements IdentifiedEntity<LogTypeId> {

    public static readonly LOG = new LogTypeModel(LogTypeId.LOG_ID, "log", (visitor) => visitor.log());
    public static readonly DEBUG = new LogTypeModel(LogTypeId.DEBUG_ID, "debug", (visitor) => visitor.debug());
    public static readonly WARNING = new LogTypeModel(LogTypeId.WARNING_ID, "warning", (visitor) => visitor.warning());
    public static readonly ERROR = new LogTypeModel(LogTypeId.ERROR_ID, "error", (visitor) => visitor.error());
    public static readonly TRACE = new LogTypeModel(LogTypeId.TRACE_ID, "trace", (visitor) => visitor.trace());

    private constructor(
        private readonly _id: LogTypeId,
        private readonly _label: string,
        private readonly _accept: <R> (visitor: LogTypeVisitor<R>) => R
    ) {
    }

    public id() {
        return this._id;
    }

    public get label() {
        return this._label;
    }

    public accept<R>(visitor: LogTypeVisitor<R>) {
        return this._accept(visitor);
    }

}