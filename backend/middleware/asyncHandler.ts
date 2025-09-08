import type { NextFunction ,Request,Response} from "express";

export interface Props{
    req:   Request; 
    res:Response;
    next:NextFunction;
}

const asyncHandler = (fn:(req:Request,res:Response,next:NextFunction)=>Promise<any>)=>{
     return ({req,res,next}:Props)=>{
    Promise
    .resolve(fn(req,res,next))
    .catch(
        (error:any)=>{
        res.status(500).json({message:error.message})
    })
}
}

    
export default asyncHandler