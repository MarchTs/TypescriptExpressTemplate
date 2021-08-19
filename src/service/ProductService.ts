import { Product, ProductType, Stock } from '@prisma/client';
import { empty } from '@prisma/client/runtime';
import { ProductCreateForm } from '../forms/ProductCreateForm';
import { ProductModel } from '../models/ProductModel';
import { instanceOfResponseError as isError, ResponseError } from '../models/ResponseError';
import ProductRepository from '../repositories/ProductRepository';
import StockRepository from '../repositories/StockRepository';

class ProductService {
    create(forms: ProductCreateForm[]): Promise<ResponseError | Product[]> {
        return ProductRepository.create(forms);
    }

    list(skus: string[]): Promise<ResponseError | ProductModel[]> {
        const result = ProductRepository.list(skus).then(async (either) => {
            if (isError(either)) return either;
            else
                return Promise.all(
                    either.map((product) => {
                        if (product.type == ProductType.standalone) {
                            return StockRepository.find(product.sku).then((stock) => {
                                return <ProductModel>{
                                    sku: product.sku,
                                    name: product.name,
                                    type: product.type,
                                    stock: { quantity: stock ? stock.quantity : null },
                                };
                            });
                        } else {
                            return ProductRepository.listChild(product.sku)
                                .then((childProdiucts) =>
                                    isError(childProdiucts)
                                        ? Promise.reject(childProdiucts)
                                        : Promise.all(
                                              childProdiucts.map((childProduct) =>
                                                  StockRepository.find(childProduct.sku).then(
                                                      (stock) => {
                                                          return {
                                                              sku: product.sku,
                                                              name: product.name,
                                                              type: product.type,
                                                              stock: {
                                                                  quantity: stock
                                                                      ? stock.quantity
                                                                      : null,
                                                              },
                                                          };
                                                      }
                                                  )
                                              )
                                          )
                                )
                                .then((children) => {
                                    return <ProductModel>{
                                        sku: product.sku,
                                        name: product.name,
                                        type: product.type,
                                        children: children.map((child) => {
                                            return {
                                                sku: product.sku,
                                                name: product.name,
                                                type: product.type,
                                                stock: {
                                                    quantity: child.stock
                                                        ? child.stock.quantity
                                                        : null,
                                                },
                                            };
                                        }),
                                    };
                                });
                        }
                    })
                );
        });

        return result;
    }
}

export = new ProductService();
