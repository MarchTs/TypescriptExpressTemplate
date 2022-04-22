import express, {
    Application,
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
} from 'express';
import { responseErrorHandler } from '../utils/ResponseHandler';

const router = express.Router();

router.use(
    (
        error: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        responseErrorHandler(res, error);
    }
);

export = router;
