import ResponseError from './ResponseError';

describe('ResponseError', () => {
    it('should set the response property correctly when a valid response object is provided', () => {
        const mockResponse = new Response(null, {
            status: 404,
            statusText: 'Not Found',
        });
        const error = new ResponseError(mockResponse);
        expect(error.response).toBe(mockResponse);
        expect(error.statusCode).toBe(404);
    });

    it('should throw an error when an undefined response object is provided', () => {
        expect(() => {
            const error = new ResponseError(undefined as unknown as Response);
            return error;
        }).toThrow(TypeError);
    });

    it('should return true if the value is a ResponseError', () => {
        const error = new ResponseError(new Response(null, { status: 404 }));
        expect(ResponseError.isResponseError(error)).toBe(true);
    });

    it('should return false if the value is not a ResponseError', () => {
        const error = new Error('Test error');
        expect(ResponseError.isResponseError(error)).toBe(false);
    });
});
