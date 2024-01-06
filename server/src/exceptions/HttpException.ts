export class HttpException extends Error {
    public status: number;

    constructor(status: number, err: Error) {
        super(err.message);
        this.name = err.name;
        this.message = err.message;
        this.status = status;
    }
}