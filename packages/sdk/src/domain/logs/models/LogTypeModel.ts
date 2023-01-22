import {LogTypeVisitor} from "../visitors/LogTypeVisitor";

export class LogTypeModel {

    public static readonly LOG = new LogTypeModel("log", (visitor) => visitor.log());
    public static readonly DEBUG = new LogTypeModel("info", (visitor) => visitor.info());
    public static readonly WARNING = new LogTypeModel("warning", (visitor) => visitor.warning());
    public static readonly ERROR = new LogTypeModel("error", (visitor) => visitor.error());
    public static readonly TRACE = new LogTypeModel("trace", (visitor) => visitor.trace());

    private constructor(
        private readonly _label: string,
        private readonly _accept: <R> (visitor: LogTypeVisitor<R>) => R
    ) {
    }

    public get label() {
        return this._label;
    }

    public accept<R>(visitor: LogTypeVisitor<R>) {
        return this._accept(visitor);
    }
}