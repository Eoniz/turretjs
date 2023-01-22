import {LogRepository} from "../repositories/LogRepository";
import {LogCreateRequestModel} from "../models/LogCreateRequestModel";

export class CreateLogUseCase {

    constructor(
        private readonly _logRepository: LogRepository
    ) {
    }

    public async execute(request: LogCreateRequestModel) {
        return await this._logRepository.createLog(request);
    }

}