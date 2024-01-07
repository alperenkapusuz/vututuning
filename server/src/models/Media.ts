import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const MediaModel = mongoose.model("Media", MediaSchema);

export default MediaModel;