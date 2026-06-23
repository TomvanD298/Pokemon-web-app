import { vi } from 'vitest';
import { assert } from './assert';
import buildUrl from './buildUrl';
import createApi from './createApi';
import ResponseError from './ResponseError';

vi.mock('./assert');
vi.mock('./buildUrl');
vi.mock('./ResponseError');

type MockResponse = {
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
    json: ReturnType<typeof vi.fn>;
};

const TEST_DATA = {
    endpoint: 'https://api.example.com',
    path: '/users',
    requestBody: { name: 'John Doe', email: 'john@example.com' },
    responseBody: { id: 1, name: 'John Doe', email: 'john@example.com' },
    params: { page: '1', limit: '10' },
    headers: { Authorization: 'Bearer token' },
};

const createMockResponse = (
    overrides: Partial<MockResponse> = {},
): MockResponse => ({
    ok: true,
    status: 200,
    statusText: 'OK',
    url: TEST_DATA.endpoint + TEST_DATA.path,
    json: vi.fn().mockResolvedValue(TEST_DATA.responseBody),
    ...overrides,
});

const setupMocks = () => {
    vi.mocked(assert).mockImplementation((value, message) => {
        if (!value) {
            throw new Error(message || 'Assertion failed');
        }
    });

    vi.mocked(buildUrl).mockImplementation((path, params = {}) => {
        if (Object.keys(params).length === 0) {
            return path;
        }
        const query = new URLSearchParams(params).toString();
        return `${path}?${query}`;
    });

    vi.mocked(ResponseError).mockImplementation(response => {
        const error = new Error(
            `ResponseError: Request "${response.url} failed with status code "${response.status}.`,
        );
        return error as unknown as ResponseError;
    });
};

const extractHeaders = (mockFetch: ReturnType<typeof vi.fn>): Headers => {
    const callArgs = mockFetch.mock.calls[0][1];
    return callArgs.headers as Headers;
};

describe('createApi', () => {
    let mockFetch: ReturnType<typeof vi.fn>;
    let mockResponse: MockResponse;

    beforeEach(() => {
        vi.clearAllMocks();
        setupMocks();

        mockResponse = createMockResponse();
        mockFetch = vi.fn().mockResolvedValue(mockResponse);
        global.fetch = mockFetch;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('factory behavior', () => {
        it('should create API object with all HTTP methods when valid endpoint is provided', () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            expect(api).toEqual({
                get: expect.any(Function),
                post: expect.any(Function),
                put: expect.any(Function),
                patch: expect.any(Function),
                delete: expect.any(Function),
            });
        });

        it('should validate endpoint using assert with correct message', () => {
            createApi({ endpoint: TEST_DATA.endpoint });

            expect(assert).toHaveBeenCalledWith(
                TEST_DATA.endpoint,
                'endpoint is required',
            );
        });

        it('should throw assertion error when endpoint is empty', () => {
            expect(() => createApi({ endpoint: '' })).toThrow(
                'endpoint is required',
            );
        });

        it('should create closure over endpoint for subsequent API calls', async () => {
            const customEndpoint = 'https://custom-api.example.com';
            const api = createApi({ endpoint: customEndpoint });

            await api.get(TEST_DATA.path);

            expect(mockFetch).toHaveBeenCalledWith(
                customEndpoint + TEST_DATA.path,
                expect.any(Object),
            );
        });
    });

    describe('api.get', () => {
        it('should make GET request and return parsed JSON response', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.get<typeof TEST_DATA.responseBody>(
                TEST_DATA.path,
            );

            expect(mockFetch).toHaveBeenCalledWith(
                TEST_DATA.endpoint + TEST_DATA.path,
                expect.objectContaining({ method: 'GET' }),
            );
            expect(result).toEqual(TEST_DATA.responseBody);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });

        it('should construct URL with query parameters when config.params provided', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get(TEST_DATA.path, { params: TEST_DATA.params });

            expect(buildUrl).toHaveBeenCalledWith(
                TEST_DATA.path,
                TEST_DATA.params,
            );
        });

        it('should use empty params object when config not provided', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get(TEST_DATA.path);

            expect(buildUrl).toHaveBeenCalledWith(TEST_DATA.path, {});
        });

        it('should pass custom headers to fetch as Headers instance', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get(TEST_DATA.path, { headers: TEST_DATA.headers });

            const headers = extractHeaders(mockFetch);
            expect(headers).toBeInstanceOf(Headers);
            expect(headers.get('Authorization')).toBe('Bearer token');
        });

        it('should pass abort signal when provided', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const controller = new AbortController();

            await api.get(TEST_DATA.path, { signal: controller.signal });

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ signal: controller.signal }),
            );
        });

        it('should throw ResponseError when response is not ok', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            mockResponse.ok = false;
            mockResponse.status = 404;

            await expect(api.get(TEST_DATA.path)).rejects.toThrow();
            expect(ResponseError).toHaveBeenCalledWith(mockResponse);
        });

        it('should propagate network errors from fetch', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const networkError = new Error('Network failure');
            mockFetch.mockRejectedValueOnce(networkError);

            await expect(api.get(TEST_DATA.path)).rejects.toThrow(
                'Network failure',
            );
        });

        it('should propagate JSON parsing errors', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const jsonError = new Error('Invalid JSON');
            mockResponse.json.mockRejectedValueOnce(jsonError);

            await expect(api.get(TEST_DATA.path)).rejects.toThrow(
                'Invalid JSON',
            );
        });
    });

    describe('api.post', () => {
        it('should make POST request with JSON body and return parsed response', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.post<typeof TEST_DATA.responseBody>(
                TEST_DATA.path,
                TEST_DATA.requestBody,
            );

            expect(mockFetch).toHaveBeenCalledWith(
                TEST_DATA.endpoint + TEST_DATA.path,
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify(TEST_DATA.requestBody),
                }),
            );
            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should set Content-Type header to application/json', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.post(TEST_DATA.path, TEST_DATA.requestBody);

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Content-Type')).toBe('application/json');
        });

        it('should merge custom headers with Content-Type header', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.post(TEST_DATA.path, TEST_DATA.requestBody, {
                headers: TEST_DATA.headers,
            });

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Content-Type')).toBe('application/json');
            expect(headers.get('Authorization')).toBe('Bearer token');
        });

        it('should handle empty data object', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.post(TEST_DATA.path, {});

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ body: JSON.stringify({}) }),
            );
        });

        it('should handle nested objects and arrays in data', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const complexData = {
                user: { name: 'John', roles: ['admin', 'user'] },
                metadata: { tags: ['tag1', 'tag2'] },
            };

            await api.post(TEST_DATA.path, complexData);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ body: JSON.stringify(complexData) }),
            );
        });
    });

    describe('api.put', () => {
        it('should make PUT request with JSON body and return parsed response', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.put<typeof TEST_DATA.responseBody>(
                TEST_DATA.path,
                TEST_DATA.requestBody,
            );

            expect(mockFetch).toHaveBeenCalledWith(
                TEST_DATA.endpoint + TEST_DATA.path,
                expect.objectContaining({
                    method: 'PUT',
                    body: JSON.stringify(TEST_DATA.requestBody),
                }),
            );
            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should set Content-Type header to application/json', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.put(TEST_DATA.path, TEST_DATA.requestBody);

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Content-Type')).toBe('application/json');
        });

        it('should merge multiple custom headers with Content-Type', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const multipleHeaders = {
                Authorization: 'Bearer token',
                'X-Request-ID': 'req-123',
                'X-Custom-Header': 'value',
            };

            await api.put(TEST_DATA.path, TEST_DATA.requestBody, {
                headers: multipleHeaders,
            });

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Content-Type')).toBe('application/json');
            expect(headers.get('Authorization')).toBe('Bearer token');
            expect(headers.get('X-Request-ID')).toBe('req-123');
            expect(headers.get('X-Custom-Header')).toBe('value');
        });

        it('should allow custom Content-Type header to override default', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.put(TEST_DATA.path, TEST_DATA.requestBody, {
                headers: { 'Content-Type': 'text/plain' },
            });

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Content-Type')).toBe('text/plain');
        });
    });

    describe('api.patch', () => {
        it('should make PATCH request with JSON body and return parsed response', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.patch<typeof TEST_DATA.responseBody>(
                TEST_DATA.path,
                TEST_DATA.requestBody,
            );

            expect(mockFetch).toHaveBeenCalledWith(
                TEST_DATA.endpoint + TEST_DATA.path,
                expect.objectContaining({
                    method: 'PATCH',
                    body: JSON.stringify(TEST_DATA.requestBody),
                }),
            );
            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should handle partial updates with single field', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const partialData = { name: 'Jane Doe' };

            await api.patch(TEST_DATA.path, partialData);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ body: JSON.stringify(partialData) }),
            );
        });

        it('should handle null values in data', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const dataWithNull = { name: 'John', email: null };

            await api.patch(TEST_DATA.path, dataWithNull);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: JSON.stringify(dataWithNull),
                }),
            );
        });

        it('should merge custom headers with Content-Type', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.patch(TEST_DATA.path, TEST_DATA.requestBody, {
                headers: { 'If-Match': 'etag-value' },
            });

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Content-Type')).toBe('application/json');
            expect(headers.get('If-Match')).toBe('etag-value');
        });
    });

    describe('api.delete', () => {
        it('should make DELETE request and return parsed response', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.delete<typeof TEST_DATA.responseBody>(
                TEST_DATA.path,
            );

            expect(mockFetch).toHaveBeenCalledWith(
                TEST_DATA.endpoint + TEST_DATA.path,
                expect.objectContaining({ method: 'DELETE' }),
            );
            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should set Content-Type header to application/json', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.delete(TEST_DATA.path);

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Content-Type')).toBe('application/json');
        });

        it('should not include body in request', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.delete(TEST_DATA.path);

            const callArgs = mockFetch.mock.calls[0][1];
            expect(callArgs.body).toBeUndefined();
        });

        it('should work without config parameter', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.delete(TEST_DATA.path);

            expect(mockFetch).toHaveBeenCalledWith(
                TEST_DATA.endpoint + TEST_DATA.path,
                expect.objectContaining({ method: 'DELETE' }),
            );
        });

        it('should pass custom headers when config is provided', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.delete(TEST_DATA.path, { headers: TEST_DATA.headers });

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Authorization')).toBe('Bearer token');
        });

        it('should construct URL with query parameters when config.params provided', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.delete(TEST_DATA.path, {
                params: { confirm: 'true' },
            });

            expect(buildUrl).toHaveBeenCalledWith(TEST_DATA.path, {
                confirm: 'true',
            });
        });
    });

    describe('error handling', () => {
        const errorCases = [
            { status: 400, description: 'Bad Request' },
            { status: 404, description: 'Not Found' },
            { status: 500, description: 'Internal Server Error' },
            { status: 503, description: 'Service Unavailable' },
        ];

        test.each(errorCases)(
            'should throw ResponseError for $status $description',
            async ({ status }) => {
                const api = createApi({ endpoint: TEST_DATA.endpoint });
                mockResponse.ok = false;
                mockResponse.status = status;

                await expect(api.get(TEST_DATA.path)).rejects.toThrow();
                expect(ResponseError).toHaveBeenCalledWith(mockResponse);
            },
        );

        const httpMethods: Array<{
            method: keyof ReturnType<typeof createApi>;
            description: string;
        }> = [
            { method: 'get', description: 'GET' },
            { method: 'post', description: 'POST' },
            { method: 'put', description: 'PUT' },
            { method: 'patch', description: 'PATCH' },
            { method: 'delete', description: 'DELETE' },
        ];

        test.each(httpMethods)(
            'should propagate network errors in $description request',
            async ({ method }) => {
                const api = createApi({ endpoint: TEST_DATA.endpoint });
                const networkError = new Error('Failed to fetch');
                mockFetch.mockRejectedValue(networkError);

                const callMethod = async () => {
                    if (
                        method === 'post' ||
                        method === 'put' ||
                        method === 'patch'
                    ) {
                        return api[method](
                            TEST_DATA.path,
                            TEST_DATA.requestBody,
                        );
                    }
                    return api[method](TEST_DATA.path);
                };

                await expect(callMethod()).rejects.toThrow('Failed to fetch');
            },
        );
    });

    describe('URL construction', () => {
        it('should concatenate endpoint and path correctly', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get('/test/path');

            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.example.com/test/path',
                expect.any(Object),
            );
        });

        it('should call buildUrl with path and params', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get(TEST_DATA.path, { params: TEST_DATA.params });

            expect(buildUrl).toHaveBeenCalledWith(
                TEST_DATA.path,
                TEST_DATA.params,
            );
        });

        it('should handle empty params object', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get(TEST_DATA.path, { params: {} });

            expect(buildUrl).toHaveBeenCalledWith(TEST_DATA.path, {});
        });
    });

    describe('headers management', () => {
        it('should create Headers instance from config.headers', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get(TEST_DATA.path, {
                headers: { 'X-Custom': 'value' },
            });

            const callArgs = mockFetch.mock.calls[0][1];
            expect(callArgs.headers).toBeInstanceOf(Headers);
        });

        it('should create Headers instance even when headers undefined', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            await api.get(TEST_DATA.path);

            const callArgs = mockFetch.mock.calls[0][1];
            expect(callArgs.headers).toBeInstanceOf(Headers);
        });

        it('should preserve all custom headers in POST request', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const multipleHeaders = {
                Authorization: 'Bearer token',
                'X-Request-ID': 'req-123',
                'X-Custom-Header': 'custom-value',
            };

            await api.post(TEST_DATA.path, TEST_DATA.requestBody, {
                headers: multipleHeaders,
            });

            const headers = extractHeaders(mockFetch);
            expect(headers.get('Authorization')).toBe('Bearer token');
            expect(headers.get('X-Request-ID')).toBe('req-123');
            expect(headers.get('X-Custom-Header')).toBe('custom-value');
            expect(headers.get('Content-Type')).toBe('application/json');
        });
    });

    describe('abort signal', () => {
        it('should pass abort signal to fetch', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const controller = new AbortController();

            await api.get(TEST_DATA.path, { signal: controller.signal });

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ signal: controller.signal }),
            );
        });

        it('should handle aborted requests', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            const controller = new AbortController();
            const abortError = new Error('The operation was aborted');
            abortError.name = 'AbortError';

            mockFetch.mockRejectedValueOnce(abortError);
            controller.abort();

            await expect(
                api.get(TEST_DATA.path, { signal: controller.signal }),
            ).rejects.toThrow('The operation was aborted');
        });
    });

    describe('type safety', () => {
        type TestResponse = { id: number; name: string; email: string };

        it('should return correctly typed response for GET', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.get<TestResponse>(TEST_DATA.path);

            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should return correctly typed response for POST', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.post<TestResponse>(
                TEST_DATA.path,
                TEST_DATA.requestBody,
            );

            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should return correctly typed response for PUT', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.put<TestResponse>(
                TEST_DATA.path,
                TEST_DATA.requestBody,
            );

            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should return correctly typed response for PATCH', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });

            const result = await api.patch<TestResponse>(TEST_DATA.path, {
                name: 'Updated Name',
            });

            expect(result).toEqual(TEST_DATA.responseBody);
        });

        it('should return correctly typed response for DELETE', async () => {
            const api = createApi({ endpoint: TEST_DATA.endpoint });
            type DeleteResponse = { success: boolean };
            mockResponse.json.mockResolvedValueOnce({ success: true });

            const result = await api.delete<DeleteResponse>(TEST_DATA.path);

            expect(result).toEqual({ success: true });
        });
    });
});
