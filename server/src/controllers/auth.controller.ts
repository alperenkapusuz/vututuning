import AuthService from "../services/auth.service";
import { NextFunction, Request, Response } from "express";

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const registerUserData = await this.authService.registerUser(userData);
      res.status(201).json({ data: registerUserData, message: "Kullanıcı Başarı ile kayıt edildi" });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const loginUserData = await this.authService.loginUser(userData);
      res.status(200).json({ data: loginUserData, message: "Kullanıcı Başarı ile giriş yaptı" });
    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
