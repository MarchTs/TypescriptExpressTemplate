import { Package, PrismaClient } from '@prisma/client';
import { ResponseModel } from '../models/ResponseModel';

class PackageRepository {
    constructor(private prisma: PrismaClient) {}
    async list(): Promise<ResponseModel<Package[]>> {
        try {
            const result = await this.prisma.package.findMany({
                orderBy: { price: 'asc' },
            });
            return { result };
        } catch (error: any) {
            return { error: { status: 500, message: error.message } };
        }
    }
}
export = new PackageRepository(new PrismaClient());
