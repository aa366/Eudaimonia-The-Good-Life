import jwt from "jsonwebtoken"
import User from "../models/userModel.ts"
import  asyncHandler , {type Props} from "./asyncHandler.ts"

const authenticate = asyncHandler(async(req,res,next)=>{
    let token;
    token = req.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET!)
            req.body.user = await User.findById(decoded)
            next() 
            
        } catch (error) {
            throw new Error("Not authorized ,token failed")
        }
    }else{
        res.status(401)
        throw new Error("Not authorized , no token")
    }
})

const authorizedAdmin = ({req,res,next}:Props)=>{
    if(req.body.user && req.body.user.isAdmin){
        next()

    }else{
        res.status(401).send("Not authorized as an admin")
    }
}

export {authenticate , authorizedAdmin}