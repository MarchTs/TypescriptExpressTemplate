import { Request, Response } from "express";

export const NotFoundMiddleware = (req: Request, res: Response) => {
    res.status(404).send({ message: "path not found" });
};
