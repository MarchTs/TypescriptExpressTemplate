export interface StockAdjustForm {
    sku: string;
    operator: operator;
    quantity: number;
}

export enum operator {
    add,
    deduct,
}
