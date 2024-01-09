import {Router} from 'express'
import {Routes} from '../interfaces/routes.interface'
import CarController from '../controllers/car.controller'
import authMiddleware from '../middlewares/auth.middleware'

class CarRoute implements Routes{
    public path = '/car'
    public router = Router()
    public carController = new CarController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/create`, authMiddleware(["admin"]), this.carController.createCar)
        this.router.get(`${this.path}/getAll`, this.carController.getAllCars)
        this.router.delete(`${this.path}/delete/:carId/:userId`, authMiddleware(["admin","user"]), this.carController.deleteCar)
    }
}

export default CarRoute