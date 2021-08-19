import { PrismaClient, Stock } from '@prisma/client';
import { StockCreateForm } from '../forms/StockCreateForm';
import { ResponseError } from '../models/ResponseError';

const prisma = new PrismaClient();

class StockRepository {
    create(forms: StockCreateForm[]): Promise<ResponseError | Stock[]> {
        return prisma.stock
            .createMany({
                data: forms.map((form) => {
                    return {
                        sku: form.sku.toString(),
                        quantity: form.quantity,
                        created: new Date(),
                        updated: new Date(),
                        isDelete: false,
                    };
                }),
            })
            .then((payload) => <Stock[]>forms)
            .catch((error) => {
                if (error.code == 'P2002')
                    return { statusCode: 400, message: 'stock is already exist' };
                else if (error.code == 'P2003')
                    return {
                        statusCode: 400,
                        message: 'sku does not exist or sku is parent product',
                    };
                else return { statusCode: 500, message: error.message };
            });
    }
}

export = new StockRepository();
