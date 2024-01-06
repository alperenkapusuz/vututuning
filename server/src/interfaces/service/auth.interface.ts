import { Request } from 'express';

export interface IUserRegisterReq {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface IUserRegisterRes {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface IUserLoginReq {
    email: string;
    password: string;
}

export interface IUserLoginRes {
    token: string;
}

export interface RequestWithUser extends  Request {
    userId: string;
}

export interface DataStoredInToken {
    userId: number;
}