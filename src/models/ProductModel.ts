import { ProductType, Stock } from '@prisma/client';

export interface ProductModel {
    sku: string;
    type: ProductType;
    name: string;
    stock?: { quantity: number } | null;
    children: {
        sku: string;
        type: ProductType;
        name: string;
        stock?: { quantity: number } | null;
    }[];
}
