import express, { Request, Response } from 'express';
import PackageFacade from '../facades/PackageFacade';
import {
    responseErrorHandler,
    responseModelHandler,
} from '../utils/ResponseHandler';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await PackageFacade.list();
        responseModelHandler(res, result);
    } catch (error) {
        return responseErrorHandler(res, error);
    }
});

export = router;
