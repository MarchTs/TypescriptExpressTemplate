import { ProductCreateForm } from '../forms/ProductCreateForm';
import ProductService from '../service/ProductService';
import { Product } from '.prisma/client';
import { ResponseError } from '../models/ResponseError';
import { ProductModel } from '../models/ProductModel';

class ProductFacade {
    create(form: ProductCreateForm[]): Promise<ResponseError | Product[]> {
        return ProductService.create(form);
    }

    list(skus: string[]): Promise<ResponseError | ProductModel[]> {
        return ProductService.list(skus);
    }
}

export = new ProductFacade();
