import { CreateHTTPAnalyticInstance } from "./http";

export const getNormalTx = async (page: number, network?: string) => {
  // https://churn-api-coinservice.incognito.org/txs/normal?from=2021-11-12 14:15:00&to=2021-11-15 15:15:00
  let fromday = new Date();
  const inst = CreateHTTPAnalyticInstance(network || "mainnet");
  return inst.get(
    `/txs/all?from=${fromday.toISOString().slice(0, 10)}&page=${page}`
  );
};
export const getDetailTx = async (hash: string, network?: string) => {
  const inst = CreateHTTPAnalyticInstance(network || "mainnet");
  return inst.get(`/tx/${hash}`);
};

export const getShieldTxs = async (page: number, network?: string) => {
  // https://churn-api-coinservice.incognito.org/txs/normal?from=2021-11-12 14:15:00&to=2021-11-15 15:15:00
  let fromday = new Date();
  const inst = CreateHTTPAnalyticInstance(network || "mainnet");
  return inst.get(
    `/txs/shielded?from=${fromday.toISOString().slice(0, 10)}&page=${page}`
  );
};

export const getTradeTxs = async (page: number, network?: string) => {
  // https://churn-api-coinservice.incognito.org/txs/normal?from=2021-11-12 14:15:00&to=2021-11-15 15:15:00
  let fromday = new Date();
  const inst = CreateHTTPAnalyticInstance(network || "mainnet");
  return inst.get(
    `/txs/pDex?from=${fromday.toISOString().slice(0, 10)}&page=${page}`
  );
};
