import Errors from "../exceptions/Errors";
import { HttpException } from "../exceptions/HttpException";
import User from "../models/User";
import { isEmpty } from "../utils/util";
import bcrypt from "bcrypt";
import { validateEmail } from "../utils/validation";
import {
  IUserLoginReq,
  IUserLoginRes,
  IUserRegisterReq,
  IUserRegisterRes,
} from "../interfaces/service/auth.interface";
import jwt from "jsonwebtoken";

class AuthService {

  public async registerUser(
    userData: IUserRegisterReq
  ): Promise<IUserRegisterRes> {
    if (isEmpty(userData)) throw new HttpException(400, Errors.Empty);
    const email = userData.email.toLowerCase();
    const isEmailValid = await validateEmail(email);
    if (!isEmailValid) throw new HttpException(400, Errors.EmailInvalid);
    const findUser: IUserRegisterRes | null = await User.findOne({ email });
    if (findUser) throw new HttpException(409, Errors.EmailExist);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({ ...userData, email, password: hashedPassword });
    await user.save();
    const createdUser: IUserRegisterRes = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return createdUser;
  }


  public async loginUser(req: IUserLoginReq): Promise<IUserLoginRes> {
    if (isEmpty(req)) throw new HttpException(400, Errors.Empty);
    const email = req.email.toLowerCase();
    const findUser = await User.findOne({ email });
    if (!findUser) throw new HttpException(409, Errors.EmailNotExist);
    const isPasswordMatch = await bcrypt.compare(
      req.password,
      findUser.password
    );
    if (!isPasswordMatch) throw new HttpException(409, Errors.PasswordNotMatch);
    const token = await this.createToken(findUser.id);
    const loginUserData: IUserLoginRes = {
      token,
    };
    return loginUserData;
  }


  public async createToken(userId: string): Promise<string> {
    const token: string = jwt.sign({ userId: userId }, "your-secret-key", {
      expiresIn: "1h",
    });
    return token;
  }
  
}

export default AuthService;
