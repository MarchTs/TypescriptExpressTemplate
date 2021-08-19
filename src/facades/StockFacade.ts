import { Stock } from '@prisma/client';
import { StockAdjustForm } from '../forms/StockAdjustForm';
import { StockCreateForm } from '../forms/StockCreateForm';
import { ResponseError } from '../models/ResponseError';
import StockService from '../service/StockService';

class StockFacade {
    create(forms: StockCreateForm[]): Promise<ResponseError | Stock[]> {
        return StockService.create(forms);
    }

    adjustStock(forms: StockAdjustForm[]): Promise<ResponseError | Stock[]> {
        return StockService.adjustStock(forms);
    }
}

export = new StockFacade();
