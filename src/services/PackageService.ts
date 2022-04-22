import { Package, PrismaClient } from '@prisma/client';
import { ResponseModel } from '../models/ResponseModel';
import PackageRepository from '../repositories/PackageRepository';

class PackageService {
    constructor() {}
    async list(): Promise<ResponseModel<Package[]>> {
        return PackageRepository.list();
    }
}
export = new PackageService();
