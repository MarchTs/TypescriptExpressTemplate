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

    find(sku: string): Promise<Stock | null> {
        return prisma.stock.findFirst({ where: { sku: sku } });
    }

    findMany(skus: string[]): Promise<Stock[]> {
        return prisma.stock.findMany({ where: { sku: { in: skus } } });
    }

    update(sku: string, quantity: number, stock: Stock): Promise<Stock> {
        return prisma.stock.update({
            data: {
                sku: sku,
                quantity: quantity,
                updated: new Date(),
                created: stock.created,
                isDelete: false,
            },
            where: { sku: sku },
        });
    }

    updateMany(stocks: Stock[]): Promise<Stock[]> {
        const listExecute = stocks.map((stock) =>
            prisma.stock.update({
                data: {
                    sku: stock.sku,
                    quantity: stock.quantity,
                    updated: new Date(),
                    created: stock.created,
                    isDelete: false,
                },
                where: { sku: stock.sku },
            })
        );
        return prisma.$transaction(listExecute);
    }
}

export = new StockRepository();
