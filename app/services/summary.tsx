import { CreateHTTPAnalyticInstance } from './http';

export const getDashboard = async (network?: string) => {
    const inst = CreateHTTPAnalyticInstance((network || 'mainnet'))
    return inst.get(`/chain/volume`);
};
export const getSummary = async (network?: string) => {
    const inst = CreateHTTPAnalyticInstance((network || 'mainnet'))
    return inst.get(`/chain/summary`);
};
