import { CreateRPCInstance, CreateRPCBody } from './rpc';

export const getBlocks = async (chainId: number, network?: string) => {
    const inst = CreateRPCInstance((network || 'mainnet'))
    return inst.post('', CreateRPCBody('getblocks', [
        10,
        chainId
    ]));
};


export const getBlockchainInfo = async (network?: string) => {
    const inst = CreateRPCInstance((network || 'mainnet'))
    return inst.post('', CreateRPCBody('getblockchaininfo'));
};
