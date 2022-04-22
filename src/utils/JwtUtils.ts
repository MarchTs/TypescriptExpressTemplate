import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResponseModel } from '../models/ResponseModel';

const configs = { JWT_SECRET: 'config' };

export class JwtUtils {
    static token(content: any): string {
        return jwt.sign(content, configs.JWT_SECRET!);
    }

    static validate<T>(token: string): ResponseModel<T> {
        try {
            const result = jwt.verify(token, configs.JWT_SECRET!);
            if (typeof result == 'string')
                return {
                    error: {
                        message: 'typeof content is not JwtPayload',
                        status: 401,
                    },
                };
            else {
                return { result: result as T };
            }
        } catch (error) {
            return {
                error: {
                    error: error,
                    status: 401,
                    message: 'Invalid signature',
                },
            };
        }
    }

    static decode<T>(token: string): T {
        const pureToken = (token || '').replace('Bearer ', '');
        const payload = jwt.decode(pureToken) as JwtPayload;
        return payload as T;
    }
}
