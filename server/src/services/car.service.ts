import { ICarModel } from "../interfaces/model/car.interface";
import { IPagination } from "../interfaces/pagination.interface";
import {
  ICreateCarReq,
  ICreateCarRes,
} from "../interfaces/service/car.interface";
import Car from "../models/Car";
import Media from "../models/Media";

class CarService {
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

  public async getAllCars(
    pagination: IPagination
  ) {
    //TODO search parametresi eklenmeli
    const cars: Array<ICarModel> = await Car.find()
      .sort("-createdAt")
      .limit(Number(pagination.limit))
      .skip(Number(pagination.page) * Number(pagination.limit));

    const carObject: Array<ICreateCarRes> = await Promise.all(
      cars.map(async (car: ICarModel) => {
        const media = Media.find({ carId: car._id });

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
          media: await media,
        };
      })
    );

    const response = {
      data:[...carObject],
      page: pagination.page,
      limit: pagination.limit,
    };

    return response;
  }
}

export default CarService;
