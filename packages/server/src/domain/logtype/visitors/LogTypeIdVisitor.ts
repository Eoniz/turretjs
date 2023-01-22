import {LogTypeModel} from "../models/LogTypeModel";

export interface LogTypeIdVisitor<R> {
    log: () => R;
    debug: () => R;
    warning: () => R;
    error: () => R;
    trace: () => R;
}

export const GetLogTypeFromIdVisitor: LogTypeIdVisitor<LogTypeModel> = {
    log: () => LogTypeModel.LOG,
    debug: () => LogTypeModel.DEBUG,
    warning: () => LogTypeModel.WARNING,
    error: () => LogTypeModel.ERROR,
    trace: () => LogTypeModel.TRACE,
};

