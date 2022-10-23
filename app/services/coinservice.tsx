import { CreateHTTPCoinserviceInstance } from "./http";

export const getVerifyTokenList = async (network?: string) => {
  const inst = CreateHTTPCoinserviceInstance(network || "mainnet");
  return inst.get(`/coins/tokenlist`);
};

export const getTokenInfo = async (tokenID: string, network?: string) => {
  const inst = CreateHTTPCoinserviceInstance(network || "mainnet");
  return inst.post("/coins/tokeninfo", {
    TokenIDs: [tokenID],
  });
};
