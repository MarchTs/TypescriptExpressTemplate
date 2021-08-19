import { ProductCreateForm } from '../forms/ProductCreateForm';
import ProductService from '../service/ProductService';
import { Product } from '.prisma/client';
import { ResponseError } from '../models/ResponseError';

class ProductFacade {
    create(form: ProductCreateForm[]): Promise<ResponseError | Product[]> {
        return ProductService.create(form);
    }

    list(skus: String[]): Promise<ResponseError | Product[]> {
        return ProductService.list(skus);
    }
}

export = new ProductFacade();
