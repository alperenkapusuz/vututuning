import { NextFunction,Request,Response } from "express";
import { ICreateCarReq } from "../interfaces/service/car.interface";
import CarService from "../services/car.service";
import { IPagination } from "../interfaces/pagination.interface";

class CarController {
    public CarService = new CarService();


    public createCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const carData: ICreateCarReq = req.body;
            const createCarData = await this.CarService.createCar(carData);
            res.status(201).json({ data: createCarData, message: 'car succesfully created' });
        } catch (error) {
            next(error);
        }
    }

    public deleteCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const carId = req.params.carId;
            const userId = req.params.userId;
            await this.CarService.deleteCar(carId, userId); 
            res.status(200).json({ message: 'car succesfully deleted' });
        } catch (error) {
            next(error);
        }
    }

    public getAllCars = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = req.query.page as string;
            const limit = req.query.limit as string;
            const pagination:IPagination = { page, limit };
            const allCars = await this.CarService.getAllCars(pagination);
            res.status(200).json({ data: allCars, message: 'all cars succesfully fetched' });
        } catch (error) {
            next(error);
        }
    }
}

export default CarController;