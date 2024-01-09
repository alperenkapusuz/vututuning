import { ICarModel } from "../interfaces/model/car.interface";
import {
  ICreateCarReq,
  ICreateCarRes,
} from "../interfaces/service/car.interface";
import Car from "../models/Car";

class CarService {
  // public async createCar(carData: ICreateCarReq, files: Express.Multer.File[] ): Promise<ICreateCarRes> {
  //     //TODO böyle bir user var mı kontrol et

  //     const mediaIds = [];
  //     for (const file of files) {
  //         const media = await Media.create({
  //             filename: file.filename,
  //             path: file.path,
  //         });
  //         mediaIds.push(media._id);
  //     }

  //     const createdCar: ICarModel = await Car.create({
  //         ...carData,
  //         media: mediaIds,
  //     });

  //     const response: ICreateCarRes = {
  //         id: createdCar._id,
  //         userId: createdCar.userId.toString(),
  //         name: createdCar.name,
  //         slug: createdCar.slug,
  //         visualRating: createdCar.visualRating,
  //         acceleration: createdCar.acceleration,
  //         topSpeed: createdCar.topSpeed,
  //         handling: createdCar.handling,

  //         plate: createdCar.plate,

  //     }

  //     return response;
  // }

  public async createCar(carData: ICreateCarReq): Promise<ICreateCarRes> {
    //TODO böyle bir user var mı kontrol et
    const createdCar: ICarModel = await Car.create(carData);
    const response: ICreateCarRes = {
      id: createdCar._id,
      userId: createdCar.userId.toString(),
      name: createdCar.name,
      slug: createdCar.slug,
      visualRating: createdCar.visualRating,
      acceleration: createdCar.acceleration,
      topSpeed: createdCar.topSpeed,
      handling: createdCar.handling,
      plate: createdCar.plate,
    };
    return response;
  }

  public async getAllCars(): Promise<Array<ICreateCarRes>> {
    //TODO search parametresi eklenmeli
    const cars: Array<ICarModel> = await Car.find().sort("-createdAt");
    const response: Array<ICreateCarRes> = cars.map((car: ICarModel) => {
      return {
        id: car._id,
        userId: car.userId.toString(),
        name: car.name,
        slug: car.slug,
        visualRating: car.visualRating,
        acceleration: car.acceleration,
        topSpeed: car.topSpeed,
        handling: car.handling,
        plate: car.plate,
      };
    });
    return response;
  }
}

export default CarService;
