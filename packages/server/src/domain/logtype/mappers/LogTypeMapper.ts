import {LogTypeId} from "../models/LogTypeId";
import {LogTypeModel} from "../models/LogTypeModel";
import {GetLogTypeFromIdVisitor} from "../visitors/LogTypeIdVisitor";

export class LogTypeMapper {

    public static fromLogTypeId(logTypeId: LogTypeId): LogTypeModel;
    public static fromLogTypeId(logTypeId: number): LogTypeModel;
    public static fromLogTypeId(logTypeId: string): LogTypeModel;

    public static fromLogTypeId(logTypeId: LogTypeId | number | string) {
        if (typeof logTypeId === "number") {
            switch (logTypeId) {
                case 2:
                    return LogTypeModel.DEBUG;
                case 3:
                    return LogTypeModel.WARNING;
                case 4:
                    return LogTypeModel.ERROR;
                case 5:
                    return LogTypeModel.TRACE;
                case 1:
                default:
                    return LogTypeModel.LOG;
            }
        }

        if (typeof logTypeId === "string") {
            switch (logTypeId) {
                case "debug":
                    return LogTypeModel.DEBUG;
                case "warning":
                    return LogTypeModel.WARNING;
                case "error":
                    return LogTypeModel.ERROR;
                case "trace":
                    return LogTypeModel.TRACE;
                case "log":
                default:
                    return LogTypeModel.LOG;
            }
        }

        return logTypeId.accept(GetLogTypeFromIdVisitor);
    }
}