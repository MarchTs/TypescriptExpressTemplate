import { Product } from '@prisma/client';
import { ProductCreateForm } from '../forms/ProductCreateForm';
import { ResponseError } from '../models/ResponseError';
import ProductRepository from '../repositories/ProductRepository';

class ProductService {
    create(forms: ProductCreateForm[]): Promise<ResponseError | Product[]> {
        return ProductRepository.create(forms);
    }

    list(skus: String[]): Promise<ResponseError | Product[]> {
        return ProductRepository.list(skus);
    }
}

export = new ProductService();
