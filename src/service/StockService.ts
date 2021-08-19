import { Stock } from '@prisma/client';
import { StockCreateForm } from '../forms/StockCreateForm';
import { ResponseError } from '../models/ResponseError';
import StockRepository from '../repositories/StockRepository';

class StockService {
    create(forms: StockCreateForm[]): Promise<ResponseError | Stock[]> {
        return StockRepository.create(forms);
    }
}

export = new StockService();
