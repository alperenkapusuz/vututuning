export interface ICarModel {
    _id: object;
    name: string;
    slug: string;
    visualRating: string;
    acceleration: string;
    topSpeed: string;
    handling: string;
    //TODO Ses dosyası eklemek için nasıl bir yol izlemeliyim şu an için string dedim
    plate: string;
    userId: object; //! Schema.Types.ObjectId gibi durumlarda object olarak tanımlamak gerekiyor
    media: Array<object>;
}