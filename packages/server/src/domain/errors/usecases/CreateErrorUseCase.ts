import {ErrorRepository} from "../repositories/ErrorRepository";
import {ErrorCreateRequestModel} from "../models/ErrorCreateRequestModel";

export class CreateErrorUseCase {

    constructor(
        private readonly _errorRepository: ErrorRepository
    ) {
    }

    public async execute(request: ErrorCreateRequestModel) {
        return await this._errorRepository.createError(request);
    }

}