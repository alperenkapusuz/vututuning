import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import MediaController from "../controllers/media.controller";
import { upload } from "../middlewares/media.middleware";

class MediaRoute implements Routes {
  public path = "/media";
  public router = Router();
  public mediaController = new MediaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post( `${this.path}/uploadCarMedia/:carId`, upload.array("media", 2), this.mediaController.uploadCarMedia);
  }
}

export default MediaRoute;
