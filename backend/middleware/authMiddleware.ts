import jwt, { type JwtPayload } from "jsonwebtoken"
import User from "../models/userModel.ts"
import asyncHandler from "./asyncHandler.ts"
import type { NextFunction, Request, Response } from "express";


declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

const authenticate = asyncHandler(async (req, res, next) => {
    let token: string | undefined;
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
           
           
            req.user = await User.findById(decoded.userId).select("-password")
           
            
            next()

        } catch (error) {
            throw new Error("Not authorized ,token failed")
        }
    } else {
        res.status(401)
        throw new Error("Not authorized , no token")
    }
})

const authorizedAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next()

    } else {
        res.status(401).send("Not authorized as an admin")
    }
}

export { authenticate, authorizedAdmin }