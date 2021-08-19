import { ProductType } from '.prisma/client';

export interface ProductCreateForm {
    sku: String;
    type: ProductType;
    name: String;
    parentSku: String;
}
