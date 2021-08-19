import { PrismaClient, Product } from '@prisma/client';
import { ProductCreateForm } from '../forms/ProductCreateForm';
import { ResponseError } from '../models/ResponseError';

const prisma = new PrismaClient();

class ProductRepository {
    create(forms: ProductCreateForm[]): Promise<ResponseError | Product[]> {
        return prisma.product
            .createMany({
                data: forms.map((form) => {
                    return {
                        sku: form.sku.toString(),
                        type: form.type,
                        name: form.name.toString(),
                        parentSku: form.parentSku ? form.parentSku.toString() : null,
                        created: new Date(),
                        updated: new Date(),
                        isDelete: false,
                    };
                }),
            })
            .then((payload) => <Product[]>forms)
            .catch((error) => {
                if (error.code == 'P2002')
                    return { statusCode: 400, message: 'sku is already exist' };
                else return { statusCode: 500, message: error.message };
            });
    }

    list(skus: String[]): Promise<ResponseError | Product[]> {
        return prisma.product.findMany();
    }
}

export = new ProductRepository();
