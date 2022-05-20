import { CreateRPCInstance, CreateRPCBody } from './rpc';

export const getBlocks = async (chainId: number) => {
    const inst = CreateRPCInstance('')
    return inst.post('', CreateRPCBody('getblocks', [
        10,
        chainId
    ]));
};