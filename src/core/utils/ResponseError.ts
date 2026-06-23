export default class ResponseError extends Error {
    response: Response;

    statusCode: number;

    constructor(request: Response) {
        super(
            `ResponseError: Request "${request.url} failed with status code "${request.status}.`,
        );
        this.response = request;
        this.statusCode = request.status;
    }

    static isResponseError(value: unknown): value is ResponseError {
        return value instanceof ResponseError;
    }
}
