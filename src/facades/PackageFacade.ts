import { PackageMessage } from '../messages/PackageMessage';
import { ResponseModel } from '../models/ResponseModel';
import PackageService from '../services/PackageService';

class PackageFacade {
    async list(): Promise<ResponseModel<PackageMessage[]>> {
        const resultPackages = await PackageService.list();

        if (!resultPackages.result || resultPackages.error)
            return { error: resultPackages.error };

        const result = resultPackages.result.map((aPackage) =>
            PackageMessage.fromPackage(aPackage)
        );

        return { result };
    }
}
export = new PackageFacade();
