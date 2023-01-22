import {LogDto} from "../dto/LogDto";
import {LogModel} from "../../../../../../domain/log/models/LogModel";
import {DateUtils} from "../../../../../../utils/date/DateUtils";
import {LogTypeVisitor} from "../../../../../../domain/logtype/visitors/LogTypeVisitor";

export class LogDtoMapper {

    public static fromLog(log: LogModel): LogDto {

        const logTypeVisitor: LogTypeVisitor<"log" | "debug" | "warning" | "error" | "trace"> = {
            log: () => "log",
            debug: () => "debug",
            warning: () => "warning",
            error: () => "error",
            trace: () => "trace",
        }

        const logTypeStr = log.logType.accept(logTypeVisitor);

        return {
            id: log.id().value(),
            log: log.log,
            creationDatetime: DateUtils.toStringDatetime(log.creationDatetime),
            logType: logTypeStr,
            clientSessionId: log.clientSessionId.value()
        }
    }

}