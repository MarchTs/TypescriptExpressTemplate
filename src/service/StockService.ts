import { Stock } from '@prisma/client';
import { operator, StockAdjustForm } from '../forms/StockAdjustForm';
import { StockCreateForm } from '../forms/StockCreateForm';
import { instanceOfResponseError, ResponseError } from '../models/ResponseError';
import StockRepository from '../repositories/StockRepository';

class StockService {
    create(forms: StockCreateForm[]): Promise<ResponseError | Stock[]> {
        return StockRepository.create(forms);
    }

    async adjustStock(forms: StockAdjustForm[]): Promise<ResponseError | Stock[]> {
        const modified = StockRepository.findMany(forms.map((form) => form.sku)).then((stocks) => {
            let modified: Stock[] = [];
            let error: ResponseError | null = null;

            if (stocks.length < forms.length)
                error = { statusCode: 400, message: 'stock does not exist' };
            else {
                forms.map((form) => {
                    const stock = stocks.find((stock) => stock.sku == form.sku);
                    if (form.operator == operator.add) {
                        modified.push(<Stock>{
                            ...stock,
                            quantity: stock!.quantity + form.quantity,
                        });
                    } else if (stock!.quantity < form.quantity) {
                        error = { statusCode: 400, message: 'not enough quantity' };
                    } else {
                        return modified.push(<Stock>{
                            ...stock,
                            quantity: stock!.quantity - form.quantity,
                        });
                    }
                });
            }

            const result = error ? error : modified;
            return result;
        });

        const result = modified.then(async (after) => {
            if (instanceOfResponseError(after)) return after;
            else return await StockRepository.updateMany(after);
        });

        return result;

        // const result = forms.map(async (form) => {
        //     const stock = await StockRepository.find(form.sku);
        //     if (!stock) {
        //         return <ResponseError>{ statusCode: 400, message: 'stock does not exist' };
        //     } else if (form.operator == operator.add)
        //         return StockRepository.update(stock?.sku, stock?.quantity + form.quantity, stock);
        //     else if (stock.quantity < form.quantity) {
        //         return <ResponseError>{ statusCode: 400, message: 'not enough quantity' };
        //     } else
        //         return StockRepository.update(stock?.sku, stock?.quantity - form.quantity, stock);
        // });
        // return result.reduce((accumulate, current));
    }
}

export = new StockService();
