import { Product } from '@prisma/client';
import { ProductCreateForm } from '../forms/ProductCreateForm';
import { ProductModel } from '../models/ProductModel';
import { ResponseError } from '../models/ResponseError';
import ProductService from '../service/ProductService';

class ProductFacade {
    create(form: ProductCreateForm[]): Promise<ResponseError | Product[]> {
        return ProductService.create(form);
    }

    list(skus: string[]): Promise<ResponseError | ProductModel[]> {
        return ProductService.list(skus);
    }
}

export = new ProductFacade();
