import { IMediaReq } from "../Media/media.interface";

export interface ICarReq {
    id: string;
    userId: string;
    name: string;
    slug: string;
    visualRating: number;
    acceleration: number;
    topSpeed: number;
    handling: number;
    plate: string;
    media: Array<IMediaReq>;
}
