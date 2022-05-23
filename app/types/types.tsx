export type TxData = {
    tx_hash: string,
    lock_time: string,
    block_height: string,
    shard_id: string,
    meta_type_id: string,
    meta_type_name: string,
}

export type TxDetail = {
    Hash: string,
    LockTime: string,
    Fee: number,
    BlockHeight: number,
    BlockHash: string,
    IsInBlock: boolean,
    CustomTokenData: string,
    Index: number,
    Info: string,
    InputCoinPubKey: string,
    IsInMempool: boolean,
    IsPrivacy: boolean,
    MetaTypeId: number,
    Metadata: string,
    PrivacyCustomTokenData: string,
    PrivacyCustomTokenFee: number,
    PrivacyCustomTokenID: string,
    PrivacyCustomTokenIsPrivacy: boolean,
    PrivacyCustomTokenName: string,
    PrivacyCustomTokenProofDetail: { InputCoins: CoinData[], OutputCoins: CoinData[] }
    PrivacyCustomTokenSymbol: string,
    Proof: string,
    ProofDetail: { InputCoins: CoinData[], OutputCoins: CoinData[] }
    RawLockTime: number,
    RawSigPubKey: string,
    ShardID: number,
    Sig: string,
    SigPubKey: string,
    TransactionData: TxAdditionalData | TxShieldData,
    TxSize: number,
    Type: string,
    Version: number,
}





export type TxShieldData = {
    // meta_type_id: '261',
    // meta_type_group: 'shield',
    // meta_type_name: 'Shielded Coins V4 Response',
    // tx_hash_request: '0cc618389c491e5627aed68a1d2766389b5841f253d44230900d7805755dfbe7',
    // token_id: 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
    // token_symbol: 'pBTC',
    // token_pdecimal: 9,
    // amount: 0.1126703,
    // status: 'Mined',
    // tx_fee: '0'
}
export type TxAdditionalData = {
    amount1: number,
    amount2: number,
    meta_type_group: string,
    meta_type_id: string,
    meta_type_name: string,
    pair_token: string,
    status: string,
    token1_id: string,
    token1_pdecimal: number,
    token1_symbol: string,
    token2_id: string,
    token2_pdecimal: number,
    token2_symbol: string,
    trading_fee: string,
    tx_fee: string,
    tx_hash_request: string,
}

export type CoinData = {
    Commitment: string,
    Index: number,
    Info: string,
    KeyImage: string,
    PublicKey: string,
    Randomness: string,
    TxRandom: string,
    Value: string,
    Version: number,
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