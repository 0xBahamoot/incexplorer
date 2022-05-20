export type TxData = {
    tx_hash: string,
    lock_time: string,
    block_height: string,
    shard_id: string,
    meta_type_id: string,
    meta_type_name: string,
}


export type BlockData = {
    Time: number,
    Hash: string,
    Height: number,
    Version: number,
    MerkleRoot: string,
    BlockProducer: string,
    ProposeTime: number,
    FinalityHeight: number,
    Size: number,
    Txs: TxData[],
    Epoch: number,
    Round: number,
    ConsensusType: string,
    ValidationData: string,
    RootHash: {
        AutoStakingRoot: string,
        BeaconCandidateRoot: string,
        BeaconCommitteeAndValidatorRoot: string,
        InstructionMerkleRoot: string,
        ShardCandidateRoot: string,
        ShardCommitteeAndValidatorRoot: string,
    },
    PreviousBlockHash: string,
    NextBlockHash: string,
    Instrustions: any[],
    ShardStates: any,
}

export type ChainInfo = {
    BlockProducer: string,
    Epoch: number,
    EpochBlock: number,
    Hash: string,
    Height: number,
    RemainingBlockEpoch: number,
    Time: number,
    TotalTxs: number,
}