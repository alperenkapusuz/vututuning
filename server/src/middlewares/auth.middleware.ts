import { NextFunction, RequestHandler,Response,Request } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";
import { isEmpty } from "../utils/util";
import { HttpException } from "../exceptions/HttpException";
import Errors from "../exceptions/Errors";
import { DataStoredInToken } from "../interfaces/service/auth.interface";

const authMiddleware =  (permissions: Array<string>): RequestHandler => {
    return async (req: Request, res:Response, next:NextFunction) => {
        try {
                const Authorization = (req.header('Authorization') ? req.header('Authorization')?.split('Bearer ')[1] : null) || req.cookies['Authorization'];    
                if(Authorization){
                        const decoded = jwt.verify(Authorization, 'your-secret-key') as DataStoredInToken;
                        if(!isEmpty(permissions)){
                                const userId = decoded.userId;
                                const user = await User.findById(userId) 
                                if(user){
                                        console.log("include", permissions.includes(user.role));
                                        if(!permissions.includes(user.role)){
                                                next(new HttpException(401, Errors.PermissionDenied));
                                                return
                                        }
                                        next();
                                }
                        } else {
                                next(new HttpException(404, Errors.AuthTokenRequired));
                        }
                }

        } catch (error) {
            next(new HttpException(401, Errors.AuthTokenInvalid));
        }
    };
};

export default authMiddleware;