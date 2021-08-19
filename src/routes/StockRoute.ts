import express, { Request, Response } from 'express';
import StockFacade from '../facades/StockFacade';
import { StockCreateForm } from '../forms/StockCreateForm';
import { instanceOfResponseError } from '../models/ResponseError';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const body = <StockCreateForm[]>req.body;

    StockFacade.create(body).then((response) => {
        if (instanceOfResponseError(response)) {
            res.status(response.statusCode).json({ error: response.message });
        } else {
            res.json(
                response.map((entity) => {
                    return {
                        sku: entity.sku,
                    };
                })
            );
        }
    });
});

export = router;
