import axios from 'axios';
import { MainnetConfig, TestnetConfig } from '~/constants/constants';

const TIMEOUT = 20000;

const HEADERS = { 'Content-Type': 'application/json' };


export function CreateHTTPExplorerAPIInstance(network: string) {
    const instance = axios.create({
        timeout: TIMEOUT,
    });
    instance.interceptors.request.use(
        (req) => {
            req.baseURL = MainnetConfig.ExplorerAPI;
            req.headers = {
                ...HEADERS,
                ...req.headers,
            };
            return req;
        },
        (error) => {
            Promise.reject(error);
        },
    );
    instance.interceptors.response.use(
        (res) => {
            const result = res?.data;
            const error = res?.data?.Error;
            if (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        },
        async (error) => {
            if (error?.isAxiosError && !error?.response) {
                throw new Error('Send request API failed');
            }
            return Promise.reject(error);
        },
    );
    return instance;
}

export function CreateHTTPAnalyticInstance(network: string) {
    const instance = axios.create({
        timeout: TIMEOUT,
    });
    instance.interceptors.request.use(
        (req) => {
            req.baseURL = MainnetConfig.AnalyticsEndpoint;
            req.headers = {
                ...HEADERS,
                ...req.headers,
            };
            return req;
        },
        (error) => {
            Promise.reject(error);
        },
    );
    instance.interceptors.response.use(
        (res) => {
            const result = res?.data;
            const error = res?.data?.Error;
            if (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        },
        async (error) => {
            if (error?.isAxiosError && !error?.response) {
                throw new Error('Send request API failed');
            }
            return Promise.reject(error);
        },
    );
    return instance;
}

export function CreateHTTPCoinserviceInstance(network: string) {
    const instance = axios.create({
        timeout: TIMEOUT,
    });
    instance.interceptors.request.use(
        (req) => {
            req.baseURL = MainnetConfig.CoinserviceEndpoint;
            req.headers = {
                ...HEADERS,
                ...req.headers,
            };
            return req;
        },
        (error) => {
            Promise.reject(error);
        },
    );
    instance.interceptors.response.use(
        (res) => {
            const result = res?.data;
            const error = res?.data?.Error;
            if (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        },
        async (error) => {
            if (error?.isAxiosError && !error?.response) {
                throw new Error('Send request API failed');
            }
            return Promise.reject(error);
        },
    );
    return instance;
}
