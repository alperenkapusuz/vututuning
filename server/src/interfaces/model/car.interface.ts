export interface ICarModel {
    _id: object;
    name: string;
    slug: string;
    visualRating: number;
    acceleration: number;
    topSpeed: number;
    handling: number;
    //TODO Ses dosyası eklemek için nasıl bir yol izlemeliyim şu an için string dedim
    sound: string;
    plate: string;
    userId: object; //! Schema.Types.ObjectId gibi durumlarda object olarak tanımlamak gerekiyor
    media: Array<object>;
}