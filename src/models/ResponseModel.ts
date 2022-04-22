export interface ResponseModel<T> {
    error?: ResponseErrorModel;
    result?: T;
}

export interface ResponseErrorModel {
    message?: string;
    error?: any;
    status: number;
}
export class ResponseErrorModel implements ResponseErrorModel {
    constructor(message: string, error?: any, status?: number) {
        this.message = message;
        this.error = error;
        this.status = status ? status : 500;
    }
}

export class ResponseModel<T> implements ResponseModel<T> {}
