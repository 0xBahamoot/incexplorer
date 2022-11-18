import {
  CreateHTTPCoinserviceInstance,
  CreateHTTPExplorerAPIInstance,
} from "./http";

export const getTokenInfo = async (tokenid: string, network?: string) => {
  const inst = CreateHTTPCoinserviceInstance(network || "mainnet");
  return inst.post("/coins/tokeninfo", {
    TokenIDs: [tokenid],
  });
};

export const getMarketToken = async (network?: string) => {
  const inst = CreateHTTPExplorerAPIInstance(network || "mainnet");
  return inst.get(`explorer/token-list`);
};
export const getTokenInfoNew = async (tokenID: string, network?: string) => {
  const inst = CreateHTTPExplorerAPIInstance(network || "mainnet");
  return inst.get("explorer/token-data/" + tokenID);
};
