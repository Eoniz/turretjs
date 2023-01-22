import {ErrorModel} from "../../../../../../domain/errors/models/ErrorModel";
import {ErrorDto} from "../dto/ErrorDto";
import {DateUtils} from "../../../../../../utils/date/DateUtils";

export class ErrorDtoMapper {

    public static toErrorDto(error: ErrorModel): ErrorDto {
        return {
            id: error.id().value(),
            message: error.message,
            filename: error.filename,
            colno: error.colno,
            lineno: error.lineno,
            clientSessionId: error.clientSessionId.value(),
            creationDatetime: DateUtils.toStringDatetime(error.creationDatetime),
        }
    }

}