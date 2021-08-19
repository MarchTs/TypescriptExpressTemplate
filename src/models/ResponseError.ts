export interface ResponseError {
    statusCode: number;
    message: String;
}

export function instanceOfResponseError(object: any): object is ResponseError {
    return 'statusCode' in object;
}
