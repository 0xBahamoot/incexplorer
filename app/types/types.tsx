export type TxData = {
    tx_hash: string,
    lock_time: string,
    block_height: string,
    shard_id: string,
    meta_type_id: string,
    meta_type_name: string,
    amount: number,
    token_id: string,
    token_symbol: string,

    //Trade
    pdex_buy_amount: number,
    pdex_sell_amount: number,
    pdex_buy_token_id: string,
    pdex_sell_token_id: string,
    pdex_buy_token_symbol: string,
    pdex_sell_token_symbol: string,
    pdex_nft_id: string,
    pdex_order_id: string,
    pdex_pair_token: string,
    pdex_pool_id: string,
    pdex_pool_id_tx_request: string,
    pdex_status: string,
    pdex_trading_fee: number,
    side: string,

    //     pdex_buy_amount: 3.269243434
    // ​​​
    // pdex_buy_token_id: "be02b225bcd26eeae00d3a51e554ac0adcdcc09de77ad03202904666d427a7e4"
    // ​​​
    // pdex_buy_token_symbol: "pBUSD"
    // ​​​
    // pdex_nft_id: ""
    // ​​​
    // pdex_order_id: ""
    // ​​​
    // pdex_pair_token: "pUSDT-pBUSD"
    // ​​​
    // pdex_pool_id: "716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0-be02b225bcd26eeae00d3a51e554ac0adcdcc09de77ad03202904666d427a7e4-676779678ea9ec76b29de2f3304e7dbc6dd0f964ef7c6bf43870a5219986e3a7"
    // ​​​
    // pdex_pool_id_tx_request: "676779678ea9ec76b29de2f3304e7dbc6dd0f964ef7c6bf43870a5219986e3a7"
    // ​​​
    // pdex_sell_amount: 3.120002
    // ​​​
    // pdex_sell_token_id: "716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0"
    // ​​​
    // pdex_sell_token_symbol: "pUSDT"
    // ​​​
    // pdex_status: "success"
    // ​​​
    // pdex_trading_fee: 0.007801
    // ​​​
    // shard_id: "7"
    // ​​​
    // side: "Sell"
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
    TransactionData: TxAdditionalData,
    TxSize: number,
    Type: string,
    Version: number,
}


export type TxAdditionalData = {
    token_id: string,
    token_symbol: string,
    token_pdecimal: number,
    amount: number,
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
    TxRoot: string,
    TxHashes: string[],
    Txs: any[],
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
    Instructions: any,
    Instruction: any,
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

export type TxInBlock = {
    Hash: String,
    Locktime: number,
    HexData: string,
}