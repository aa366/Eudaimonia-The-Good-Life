import type { NextFunction, Request, Response } from "express";


const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {

    return (req: Request, res: Response,
         next: NextFunction) => {
        Promise
            .resolve(fn(req, res, next))
            .catch(
                (error: any) => {
                    res.status(500).json({ message: error.message })
                })
    }
}


export default asyncHandler