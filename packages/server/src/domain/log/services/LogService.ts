import {CreateLogUseCase} from "../usecases/CreateLogUseCase";
import {LogCreateRequestModel} from "../models/LogCreateRequestModel";

export class LogService {

    constructor(
        private readonly _createLogUseCase: CreateLogUseCase,
    ) {
    }

    public async createLog(request: LogCreateRequestModel) {
        const maybeLog = await this._createLogUseCase.execute(request);

        if (maybeLog.isLeft()) {
            throw maybeLog.getLeft();
        }

        return maybeLog.getRight();
    }

}