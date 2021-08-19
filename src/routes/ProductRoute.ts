import express, { Request, Response } from 'express';
import ProductFacade from '../facades/ProductFacade';
import { ProductCreateForm } from '../forms/ProductCreateForm';
import { instanceOfResponseError } from '../models/ResponseError';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const body = <ProductCreateForm[]>req.body;

    ProductFacade.create(body).then((response) => {
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

router.get('/', async (req: Request, res: Response) => {
    const skus = req.query.skus ? <string[]>req.query.skus : [];

    ProductFacade.list(skus).then((response) => {
        if (instanceOfResponseError(response)) {
            res.status(response.statusCode).json({ error: response.message });
        } else {
            res.json(response);
        }
    });
});

export = router;
