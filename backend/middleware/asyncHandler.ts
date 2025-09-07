import type { NextFunction } from "express";

interface Props{
    req:    RequestInit; 
    res: ResponseInit;
    next:NextFunction
}

const asyncHandler = (fn)=>{
     return ({req,res,next}:Props)=>{
    Promise
    .resolve(fn(req,res,next))
    .catch(
        (error)=>{
        res.status(500).json({message:error.message})
    })
}
}

    
export default asyncHandler