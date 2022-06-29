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


export const getMempoolInfo = async (network?: string) => {
    const inst = CreateRPCInstance((network || 'mainnet'))
    return inst.post('', CreateRPCBody('getmempoolinfo'));

}

export const getBlock = async (blockhash: string, isBeacon: boolean, network?: string) => {
    const inst = CreateRPCInstance((network || 'mainnet'))
    if (isBeacon) {
        return inst.post('', CreateRPCBody('retrievebeaconblock', [
            blockhash,
            '2'
        ]));
    }
    return inst.post('', CreateRPCBody('retrieveblock', [
        blockhash,
        '2'
    ]));
}

export const checkHashValue = async (value: string, network?: string) => {
    const inst = CreateRPCInstance((network || 'mainnet'))
    return inst.post('', CreateRPCBody('checkhashvalue', [value]));
}