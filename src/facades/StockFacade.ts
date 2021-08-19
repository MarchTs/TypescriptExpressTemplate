import { Stock } from '@prisma/client';
import { StockCreateForm } from '../forms/StockCreateForm';
import { ResponseError } from '../models/ResponseError';
import StockService from '../service/StockService';

class StockFacade {
    create(forms: StockCreateForm[]): Promise<ResponseError | Stock[]> {
        return StockService.create(forms);
    }
}

export = new StockFacade();
