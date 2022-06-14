import { CreateHTTPCoinserviceInstance } from './http';

export const getVerifyTokenList = async (network?: string) => {
    const inst = CreateHTTPCoinserviceInstance((network || 'mainnet'))
    return inst.get(`/pdex/v3/markettokens`);
};