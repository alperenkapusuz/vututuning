export interface ICreateCarReq {
    name: string;
    visualRating: number;
    acceleration: number;
    topSpeed: number;
    handling: number;
    //TODO Ses dosyası eklemek için nasıl bir yol izlemeliyim şu an için string dedim
    sound: string;
    plate: string;
    userId: string;
}

export interface ICreateCarRes {
    id: object;
    name: string;
    slug: string;
    visualRating: number;
    acceleration: number;
    topSpeed: number;
    handling: number;
    sound: string;
    plate: string;
    userId: string;
    media: Array<object>;
}