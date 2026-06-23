import { assert } from './assert';
import buildUrl from './buildUrl';
import ResponseError from './ResponseError';

type ApiConfig = {
    endpoint: string;
};

type Api = {
    get: <GetResponse>(
        path: string,
        config?: ApiMethodConfig,
    ) => Promise<GetResponse>;
    put: <PutResponse>(
        path: string,
        data: Record<string, any>,
        config?: ApiMethodConfig,
    ) => Promise<PutResponse>;
    post: <PostResponse>(
        path: string,
        data: Record<string, any>,
        config?: ApiMethodConfig,
    ) => Promise<PostResponse>;
    patch: <PatchResponse>(
        path: string,
        data: Record<string, any>,
        config?: ApiMethodConfig,
    ) => Promise<PatchResponse>;
    delete: <DeleteResponse>(
        path: string,
        config?: ApiMethodConfig,
    ) => Promise<DeleteResponse>;
};

type ApiMethodConfig = RequestInit & {
    params?: Record<string, string>;
    signal?: AbortSignal;
};

const createApi = ({ endpoint }: ApiConfig): Api => {
    assert(endpoint, 'endpoint is required');

    const getResponse = async <T>(
        method: RequestInit['method'],
        path: string,
        config: ApiMethodConfig,
    ): Promise<T> => {
        const { params = {}, ...init } = config;

        init.headers = new Headers(init.headers);
        init.method = method;

        const url = endpoint + buildUrl(path, params);

        const response = await fetch(url, init);

        if (!response.ok) {
            throw new ResponseError(response);
        }

        const data: T = await response.json();

        return data;
    };

    const api = {
        get: async <GetResponse>(
            path: string,
            config?: ApiMethodConfig,
        ): Promise<GetResponse> => getResponse('GET', path, config || {}),
        put: async <PutResponse>(
            path: string,
            data: Record<string, any>,
            config?: ApiMethodConfig,
        ): Promise<PutResponse> =>
            getResponse('PUT', path, {
                ...config,
                headers: {
                    'Content-Type': 'application/json',
                    ...config?.headers,
                },
                body: JSON.stringify(data),
            }),
        post: async <PostResponse>(
            path: string,
            data: Record<string, any>,
            config?: ApiMethodConfig,
        ): Promise<PostResponse> =>
            getResponse('POST', path, {
                ...config,
                headers: {
                    'Content-Type': 'application/json',
                    ...config?.headers,
                },
                body: JSON.stringify(data),
            }),
        patch: async <PatchResponse>(
            path: string,
            data: Record<string, any>,
            config?: ApiMethodConfig,
        ): Promise<PatchResponse> =>
            getResponse('PATCH', path, {
                ...config,
                headers: {
                    'Content-Type': 'application/json',
                    ...config?.headers,
                },
                body: JSON.stringify(data),
            }),
        delete: async <DeleteResponse>(
            path: string,
            config?: ApiMethodConfig,
        ): Promise<DeleteResponse> =>
            getResponse('DELETE', path, {
                ...config,
                headers: {
                    'Content-Type': 'application/json',
                    ...config?.headers,
                },
            }),
    };
    return api;
};

export default createApi;
