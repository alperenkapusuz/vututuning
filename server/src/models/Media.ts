import mongoose from "mongoose";
import { IMediaModel } from "../interfaces/model/media.interface";

const Schema = mongoose.Schema;

const MediaSchema = new Schema<IMediaModel>({
  name: { type: String, required: true },
  path: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
});

const MediaModel = mongoose.model<IMediaModel>("Media", MediaSchema);

export default MediaModel;
