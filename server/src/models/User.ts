import mongoose, { model } from "mongoose";
import { IUserModel } from "../interfaces/model/user.interface";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "user"], default: "user"},
});

const UserModel = model<IUserModel>("User", UserSchema);

export default UserModel;

