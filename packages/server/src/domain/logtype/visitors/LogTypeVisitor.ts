
export interface LogTypeVisitor<R> {
    log: () => R;
    debug: () => R;
    warning: () => R;
    error: () => R;
    trace: () => R;
}
