import {Router} from 'express'
import {Routes} from '../interfaces/routes.interface'
import CarController from '../controllers/car.controller'

class CarRoute implements Routes{
    public path = '/car'
    public router = Router()
    public carController = new CarController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/create`, this.carController.createCar)
        this.router.get(`${this.path}/getAll`, this.carController.getAllCars)
    }
}

export default CarRoute