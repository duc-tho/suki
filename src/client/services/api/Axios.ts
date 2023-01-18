import { AxiosConfig } from './../../core/config/AxiosConfig';
import axios, { AxiosError, AxiosResponse } from 'axios';

export type ApiResponse<T> = {
    code?: number
    message?: string,
    status: string,
    data?: T
}

const handleResponseSuccess = (response: AxiosResponse) => {
    return response.data.data;
}

const handleResponseError = (error: AxiosError) => {
    return {
        code: error.response?.status,
        message: ((error.response?.data as ApiResponse<any>).message) ?? error.message,
        status: "error",
    };
}

export const Axios = axios.create({
    baseURL: AxiosConfig.BaseURL
})

Axios.interceptors.response.use(handleResponseSuccess, handleResponseError);
