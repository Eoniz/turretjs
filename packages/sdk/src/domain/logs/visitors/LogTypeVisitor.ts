import {LogTypeModel} from "../models/LogTypeModel";

export interface LogTypeVisitor<R> {
    info: () => R;
    log: () => R;
    trace: () => R;
    warning: () => R;
    error: () => R;
}

export function getLoggerFromType(logType: LogTypeModel) {
    const visitor: LogTypeVisitor<(...data: Array<any>) => void> = {
        info: () => console.info,
        log: () => console.log,
        trace: () => console.trace,
        warning: () => console.warn,
        error: () => console.error,
    }

    return logType.accept(visitor);
}