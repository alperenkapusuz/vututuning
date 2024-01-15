export interface ICreateCarReq {
    name: string;
    visualRating: string;
    acceleration: string;
    topSpeed: string;
    handling: string;
    //TODO Ses dosyası eklemek için nasıl bir yol izlemeliyim şu an için string dedim
    plate: string;
    userId: string;
}

export interface ICreateCarRes {
    id: object;
    name: string;
    slug: string;
    visualRating: string;
    acceleration: string;
    topSpeed: string;
    handling: string;
    plate: string;
    userId: string; 
}

export interface ICarRes {
    id: object;
    name: string;
    slug: string;
    visualRating: string;
    acceleration: string;
    topSpeed: string;
    handling: string;
    plate: string;
    userId: string;
    media: Array<object>; 
}