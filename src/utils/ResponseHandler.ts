import express from "express";
import { ResponseErrorModel, ResponseModel } from "../models/ResponseModel";

export function responseModelHandler<T>(
    res: express.Response,
    result: ResponseModel<T>
): void {
    if (result.error) {
        res.status(result.error.status).send({
            data: {},
            message: "",
            ...result.error,
        });
    } else {
        res.send({ data: result.result, message: "" });
    }
}
export function responseHandler<T>(
    res: express.Response,
    data?: T,
    error?: ResponseErrorModel
): void {
    if (error) {
        res.status(error.status).send({
            data: {},
            message: "",
            ...error,
        });
    } else {
        res.send({ data: data, message: "" });
    }
}

export function responseErrorHandler<T>(
    res: express.Response,
    error?: any
): void {
    console.error(error.stack);

    const errorResult: ResponseErrorModel = {
        message: error.message,
        error: error.error,
        status: 500,
    };
    res.status(500).send({
        data: {},
        ...errorResult,
    });
}
