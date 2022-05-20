import http from './http';

export const getDashboard = async () => {
    const inst = http('')
    return inst.get(`/chain/volume`);
};
export const getSummary = async () => {
    const inst = http('')
    return inst.get(`/chain/summary`);
};
