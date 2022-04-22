import { Package } from '@prisma/client';

export interface PackageMessage {
    id: number;
    title: string;
    price: number;
    imageThumbnail?: string;
}

export class PackageMessage {
    static fromPackage(aPackage: Package): PackageMessage {
        return {
            id: aPackage.id,
            title: aPackage.title,
            price: aPackage.price,
            imageThumbnail: aPackage.imageThumbnail ?? '',
        };
    }
}
