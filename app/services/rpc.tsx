import axios from 'axios';
import { MainnetConfig } from '~/constants/constants';

const TIMEOUT = 20000;

const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
function CreateRPCInstance(endpoint: string) {
    const instance = axios.create({
        timeout: TIMEOUT,
    });
    instance.interceptors.request.use(
        (req) => {
            req.baseURL = MainnetConfig.FullnodeEndpoint;
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


function CreateRPCBody(method: string, params: any) {
    return {
        jsonrpc: '1.0',
        method,
        params,
        id: 1
    }
}

export { CreateRPCInstance, CreateRPCBody };
