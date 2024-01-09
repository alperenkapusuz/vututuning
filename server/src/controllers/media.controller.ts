import { Request, Response, NextFunction } from "express";
import MediaService from "../services/media.service";

class MediaController {
    public MediaService = new MediaService();
    
    public uploadCarMedia = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const files = req.files as Express.Multer.File[];
            const carId = req.params.carId;
            const mediaIds = await this.MediaService.uploadCarMedia(files, carId);
            res.status(201).json({ data: mediaIds, message: 'media succesfully created' });
        } catch (error) {
            next(error);
        }
    }

}

export default MediaController;