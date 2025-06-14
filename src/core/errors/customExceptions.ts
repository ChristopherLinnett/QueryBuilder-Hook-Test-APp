export class CustomException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomException";
    }
}

export class ServerException extends CustomException {
    constructor(message: string) {
        super(message);
        this.name = "ServerException";
    }
}
export class CacheException extends CustomException {
    constructor(message: string) {
        super(message);
        this.name = "CacheException";
    }
}
export class NetworkException extends CustomException {
    constructor(message: string) {
        super(message);
        this.name = "NetworkException";
    }
}
export class DataFormatException extends CustomException {
    constructor(message: string) {
        super(message);
        this.name = "DataFormatException";
    }
}