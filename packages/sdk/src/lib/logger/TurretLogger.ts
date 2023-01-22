import {TurretContext} from "../context/TurretContext";
import moment from "moment";
import {getLoggerFromType, LogTypeVisitor} from "../../domain/logs/visitors/LogTypeVisitor";
import {LogTypeModel} from "../../domain/logs/models/LogTypeModel";

export class TurretLogger {

    private static _INSTANCE: TurretLogger | null = null;

    private formatter: (context: TurretContext, ...data: Array<any>) => string = (context: TurretContext, ...data: Array<any>) => {
        const now = moment().format("YYYY-MM-DD[T]HH:mm:ss[Z]");
        return `[${context.options.project}@${context.options.projectVersion}] - [${context.clientSession?.uuid ?? 'no session'}] - ${now} - ${data}`;
    }

    private constructor(
        private readonly _turretContext: TurretContext,
    ) {
    }

    public static get instance() {
        if (!TurretLogger._INSTANCE) {
            if (!("turret" in window)) {
                throw new Error("Turret is not bind in window, aborting ...");
            }

            this._INSTANCE = new TurretLogger(window.turret as TurretContext);
        }

        return this._INSTANCE;
    }

    protected get turretContext() {
        return this._turretContext;
    }

    private handleIncomingLog(logType: LogTypeModel, ...data: Array<any>) {
        let logger = getLoggerFromType(logType);

        const str = this.formatter(this._turretContext, ...data);
        logger(str);

        data.forEach((_data) => {
            if (!this._turretContext.clientSession) {
                return;
            }

            const visitor: LogTypeVisitor<"log" | "debug" | "warning" | "error" | "trace"> = {
                info: () => "debug",
                log: () => "log",
                trace: () => "trace",
                warning: () => "warning",
                error: () => "error",
            };

            const logTypeStr = logType.accept(visitor);

            this._turretContext.trpcClient.createLog.mutate({
                log: JSON.stringify(_data),
                logType: logTypeStr,
                clientSessionId: this._turretContext.clientSession.id,
            })
                .catch((err) => {
                    console.error(`Failed to send log to turret: ${err}`);
                });
        })
    }

    public static log(...data: Array<any>) {
        console.log(...data);

        if (!TurretLogger.instance) {
            return;
        }

        TurretLogger.instance.handleIncomingLog(LogTypeModel.LOG, ...data);
    }

    public static trace(...data: Array<any>) {
        console.trace(...data);

        if (!TurretLogger.instance) {
            return;
        }

        TurretLogger.instance.handleIncomingLog(LogTypeModel.TRACE, ...data);
    }

    public static warn(...data: Array<any>) {
        console.warn(...data);

        if (!TurretLogger.instance) {
            return;
        }

        TurretLogger.instance.handleIncomingLog(LogTypeModel.WARNING, ...data);
    }

    public static error(...data: Array<any>) {
        console.error(...data);

        if (!TurretLogger.instance) {
            return;
        }

        TurretLogger.instance.handleIncomingLog(LogTypeModel.ERROR, ...data);
    }

    public static info(...data: Array<any>) {
        console.info(...data);

        if (!TurretLogger.instance) {
            return;
        }

        TurretLogger.instance.handleIncomingLog(LogTypeModel.DEBUG, ...data);
    }

    private setFormatter(formatter: () => string) {
        this.formatter = formatter;
    }

    public static formatter(newFormatter: () => string) {
        if (!TurretLogger.instance) {
            throw new Error("TurretLogger is not initialized.");
        }

        TurretLogger.instance.setFormatter(newFormatter);
    }
}