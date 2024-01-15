import mongoose, { model } from "mongoose";
import slugify from "slugify";
import { ICarModel } from "../interfaces/model/car.interface";

const Schema = mongoose.Schema;

const CarSchema = new Schema<ICarModel>({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  visualRating: { type: String, required: true },
  acceleration: { type: String, required: true },
  topSpeed: { type: String, required: true },
  handling: { type: String, required: true},
  plate: { type: String, required: true, unique: true }, //? Polislerin arabayı yakalaması sıkıntı yaratabilir mi? //TODO plaka number türünde olabilir.
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
});

CarSchema.pre<ICarModel>(RegExp("validate"), function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

const CarModel = model<ICarModel>("Car", CarSchema);

export default CarModel;
