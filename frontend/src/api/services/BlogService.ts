/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Blog } from '../models/Blog';
import type { PatchedBlog } from '../models/PatchedBlog';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BlogService {
    /**
     * @returns Blog
     * @throws ApiError
     */
    public static blogList(): CancelablePromise<Array<Blog>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blog/',
        });
    }
    /**
     * @param requestBody
     * @returns Blog
     * @throws ApiError
     */
    public static blogCreate(
        requestBody: Blog,
    ): CancelablePromise<Blog> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/blog/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this Blog.
     * @returns Blog
     * @throws ApiError
     */
    public static blogRetrieve(
        id: number,
    ): CancelablePromise<Blog> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blog/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this Blog.
     * @param requestBody
     * @returns Blog
     * @throws ApiError
     */
    public static blogUpdate(
        id: number,
        requestBody: Blog,
    ): CancelablePromise<Blog> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/blog/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this Blog.
     * @param requestBody
     * @returns Blog
     * @throws ApiError
     */
    public static blogPartialUpdate(
        id: number,
        requestBody?: PatchedBlog,
    ): CancelablePromise<Blog> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/blog/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this Blog.
     * @returns void
     * @throws ApiError
     */
    public static blogDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/blog/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
