export type TxData = {
  tx_hash: string;
  lock_time: string;
  block_hash: string;
  block_height: string;
  shard_id: string;
  meta_type_id: string;
  meta_type_name: string;
  amount: number;
  token_id: string;
  token_symbol: string;

  //Trade
  pdex_buy_amount: number;
  pdex_sell_amount: number;
  pdex_buy_token_id: string;
  pdex_sell_token_id: string;
  pdex_buy_token_symbol: string;
  pdex_sell_token_symbol: string;
  pdex_nft_id: string;
  pdex_order_id: string;
  pdex_pair_token: string;
  pdex_pool_id: string;
  pdex_pool_id_tx_request: string;
  pdex_status: string;
  pdex_trading_fee: number;
  side: string;

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
};

export type TxDetail = {
  Hash: string;
  LockTime: string;
  Fee: number;
  BlockHeight: number;
  BlockHash: string;
  IsInBlock: boolean;
  CustomTokenData: string;
  Index: number;
  Info: string;
  InputCoinPubKey: string;
  IsInMempool: boolean;
  IsPrivacy: boolean;
  Metatype: number;
  Metadata: string;
  PrivacyCustomTokenData: string;
  PrivacyCustomTokenFee: number;
  PrivacyCustomTokenID: string;
  PrivacyCustomTokenIsPrivacy: boolean;
  PrivacyCustomTokenName: string;
  PrivacyCustomTokenProofDetail: {
    InputCoins: CoinData[];
    OutputCoins: CoinData[];
  };
  PrivacyCustomTokenSymbol: string;
  Proof: string;
  ProofDetail: { InputCoins: CoinData[]; OutputCoins: CoinData[] };
  RawLockTime: number;
  RawSigPubKey: string;
  ShardID: number;
  Sig: string;
  SigPubKey: string;
  TransactionData: TxAdditionalData;
  TxSize: number;
  Type: string;
  Version: number;
};

export type TxAdditionalData = {
  token_id: string;
  token_symbol: string;
  token_pdecimal: number;
  amount: number;
  amount1: number;
  amount2: number;
  meta_type_group: string;
  meta_type_id: string;
  meta_type_name: string;
  pair_token: string;
  status: string;
  token1_id: string;
  token1_pdecimal: number;
  token1_symbol: string;
  token2_id: string;
  token2_pdecimal: number;
  token2_symbol: string;
  trading_fee: string;
  tx_fee: string;
  tx_hash_request: string;
};

export type CoinData = {
  Commitment: string;
  Index: number;
  Info: string;
  KeyImage: string;
  PublicKey: string;
  Randomness: string;
  TxRandom: string;
  Value: string;
  Version: number;
};
export type BlockData = {
  Time: number;
  Hash: string;
  Height: number;
  Version: number;
  MerkleRoot: string;
  BlockProducer: string;
  ProposeTime: number;
  FinalityHeight: number;
  Size: number;
  TxRoot: string;
  TxHashes: string[];
  Txs: any[];
  Epoch: number;
  Round: number;
  ConsensusType: string;
  ValidationData: string;
  RootHash: {
    AutoStakingRoot: string;
    BeaconCandidateRoot: string;
    BeaconCommitteeAndValidatorRoot: string;
    InstructionMerkleRoot: string;
    ShardCandidateRoot: string;
    ShardCommitteeAndValidatorRoot: string;
  };
  PreviousBlockHash: string;
  NextBlockHash: string;
  Instructions: any;
  Instruction: any;
  ShardStates: any;
};

export type ChainInfo = {
  BlockProducer: string;
  Epoch: number;
  EpochBlock: number;
  Hash: string;
  Height: number;
  RemainingBlockEpoch: number;
  Time: number;
  TotalTxs: number;
};

export type TxInBlock = {
  Hash: String;
  Locktime: number;
  HexData: string;
};

export type TokenInfo = {
  TokenID: string;
  Symbol: string;
  PSymbol: string;
  Name: string;
  IsPrivacy: boolean;
  Verified: boolean;
  ExternalPriceUSD: number;
  PriceUsd: number;
  Network: string;
  PercentChange24h: string;
  ContractID: string;
  PDecimals: number;
  Decimals: number;
  CurrencyType: number;
  ListUnifiedToken: [TokenInfo];
  TokenTradingVolumeUSD24H: number;
  TokenTradingVolumeUSDTotal: number;
  // "TokenID": "1054c3920754a182b60380bbdf64d3ace74746fe5b71d30a2d215b9e56599ef3",
  // "Name": "Binamon Energy",
  // "Symbol": "BNRG",
  // "Image": "",
  // "IsPrivacy": true,
  // "IsBridge": true,
  // "ExternalID": "[66 83 67 216 129 59 93 250 154 190 182 147 242 23 187 144 94 201 155 102 251 1 124]",
  // "PDecimals": 9,
  // "Decimals": 18,
  // "ContractID": "0xd8813b5dfa9abeb693f217bb905ec99b66fb017c",
  // "Status": 1,
  // "Type": 1,
  // "CurrencyType": 8,
  // "Default": false,
  // "Verified": false,
  // "UserID": 179660,
  // "ListChildToken": [],
  // "PSymbol": "pBNRG",
  // "OriginalSymbol": "",
  // "LiquidityReward": 0,
  // "ExternalPriceUSD": 0,
  // "PriceUsd": 0,
  // "PercentChange1h": "",
  // "PercentChangePrv1h": "",
  // "PercentChange24h": "0.00",
  // "CurrentPrvPool": 0,
  // "PricePrv": 0,
  // "volume24": 0,
  // "ParentID": 0,
  // "Network": "BSC",
  // "DefaultPoolPair": "",
  // "DefaultPairToken": ""
};
