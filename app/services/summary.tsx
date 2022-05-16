import http from './http';

export const getDashboard = async () => {
    return http.get(`/chain/volume`);
};
export const getSummary = async () => {
    return http.get(`/chain/summary`);
};
