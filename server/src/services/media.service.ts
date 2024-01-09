import { IMediaModel } from "../interfaces/model/media.interface";
import Media from "../models/Media";

class MediaService {
    public async uploadCarMedia(files: Express.Multer.File[], carId: string): Promise<Array<string>> {
        const mediaIds: Array<string> = [];
        for (const file of files) {
            const media: IMediaModel = await Media.create({
                carId,
                name: file.originalname,
                path: file.path,
                type: file.mimetype,
            });
            mediaIds.push(media._id.toString());
        }
        return mediaIds;
    }
}

export default MediaService;