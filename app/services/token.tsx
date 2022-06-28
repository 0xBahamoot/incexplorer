import { CreateHTTPCoinserviceInstance } from "./http";

export const getTokenInfo = async (tokenid: string, network?: string) => {
  const inst = CreateHTTPCoinserviceInstance(network || "mainnet");
  return inst.post("/coins/tokeninfo", {
    TokenIDs: [tokenid],
  });
};
