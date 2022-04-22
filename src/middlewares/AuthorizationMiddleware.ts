import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { ResponseErrorModel } from '../models/ResponseModel';
import { JwtUtils } from '../utils/JwtUtils';

export const AuthorizationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const tokenBearer: string = req.headers['authorization'] ?? '';
    if (_.isEmpty(tokenBearer)) {
        return res
            .status(401)
            .send(<ResponseErrorModel>{ message: 'token not found' });
    }
    const token = tokenBearer.replace('Bearer ', '');
    const contentResult = JwtUtils.validate(token);
    if (contentResult.error) {
        res.status(contentResult.error.status).send(
            contentResult.error.message
        );
    } else next();
};

export const AdminAuthenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const tokenBearer: string = req.headers['authorization'] ?? '';
    if (_.isEmpty(tokenBearer)) {
        return res
            .status(401)
            .send(<ResponseErrorModel>{ message: 'token not found' });
    }
    const token = tokenBearer.replace('Bearer ', '');
    const contentResult = JwtUtils.validate<JwtContent>(token);
    if (contentResult.error) {
        return res
            .status(contentResult.error.status)
            .send(contentResult.error.message);
    } else if (!contentResult.result) {
        return res
            .status(401)
            .send(<ResponseErrorModel>{ message: 'validation token failed' });
    } else if (contentResult.result.role !== Role.admin) {
        res.status(403).send({
            error: {
                message: 'User not allow to use this route',
            },
        });
    } else next();
};

export const BackOfficeAuthenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const tokenBearer: string = req.headers['authorization'] ?? '';
    if (_.isEmpty(tokenBearer)) {
        return res
            .status(401)
            .send(<ResponseErrorModel>{ message: 'token not found' });
    }
    const token = tokenBearer.replace('Bearer ', '');
    const contentResult = JwtUtils.validate<JwtContent>(token);

    if (contentResult.error) {
        res.status(contentResult.error.status).send(
            contentResult.error.message
        );
    } else if (!contentResult.result) {
        return res
            .status(401)
            .send(<ResponseErrorModel>{ message: 'validation token failed' });
    } else if (
        !_.includes([Role.admin, Role.sale], contentResult.result.role)
    ) {
        res.status(403).send({
            error: {
                message: 'User not allow to use this route',
            },
        });
    } else next();
};

export interface JwtContent {
    accountId: string;
    role: Role;
}

export enum Role {
    admin = 'admin',
    customer = 'customer',
    sale = 'sale',
}
