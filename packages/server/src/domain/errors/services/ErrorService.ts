import {CreateErrorUseCase} from "../usecases/CreateErrorUseCase";
import {ErrorCreateRequestModel} from "../models/ErrorCreateRequestModel";

export class ErrorService {

    constructor(
        private readonly _createErrorUseCase: CreateErrorUseCase,
    ) {
    }

    public async createError(request: ErrorCreateRequestModel) {
        const maybeError = await this._createErrorUseCase.execute(request);

        if (maybeError.isLeft()) {
            throw maybeError.getLeft();
        }

        return maybeError.getRight();
    }

}