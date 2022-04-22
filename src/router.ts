import express from 'express';
import PackageController from './controllers/PackageController';

const router = express.Router();

router.use('/packages', PackageController);

export = router;
