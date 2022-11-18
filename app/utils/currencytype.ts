export function currencyTypeToNetworkName(ctype: number): string {
  let result = currencyTypeToNetworkNameMap.get(ctype);
  if (result === undefined) {
    result = "";
  }
  return result;
}

const ETH = "ethereum";
const PLG = "polygon";
const BSC = "binance smart chain";
const FTM = "fantom";
const AURORA = "aurora";
const AVAX = "avalanche";
const NEAR = "near";
const BTC = "bitcoin";
const BNB = "binance chain";
const DOGE = "doge";
const ZIL = "zilliqa";
const XMR = "monero";
const INC = "incognito";
const NEO = "neo";
const DASH = "dash";
const DOT = "polkadot";
const TOMO = "tomo chain";
const LTC = "litecoin";
const ZEC = "zcash";
const SOL = "solana";

const currencyTypeToNetworkNameMap = new Map<number, string>([
  [0, INC],
  [1, ETH],
  [2, BTC],
  [3, ETH],
  [4, BSC],
  [5, FTM],
  [7, BSC],
  [8, BSC],
  [9, TOMO],
  [10, ZIL],
  [11, XMR],
  [12, NEO],
  [13, DASH],
  [14, LTC],
  [15, DOGE],
  [16, ZEC],
  [17, DOT],
  [18, INC],
  [19, PLG],
  [20, PLG],
  [21, FTM],
  [22, FTM],
  [23, SOL],
  [24, SOL],
  [25, INC],
  [26, NEAR],
  [27, NEAR],
  [28, AVAX],
  [29, AVAX],
  [30, AURORA],
  [31, AURORA],
]);

// Unknown  = iota
// 	ETH      //1
// 	BTC      //2
// 	ERC20    //3
// 	BNB      //4
// 	BNB_BEP2 //5
// 	USD      //6

// 	BNB_BSC   //7
// 	BNB_BEP20 //8

// 	TOMO //9
// 	ZIL  //10
// 	XMR  //11
// 	NEO  //12
// 	DASH //13
// 	LTC  //14
// 	DOGE //15
// 	ZEC  //16
// 	DOT  //17
// 	PDEX //18 0000000000000000000000000000000000000000000000000000000000000006

// 	// Polygon:
// 	MATIC     //19
// 	PLG_ERC20 //20

// 	FTM       //21
// 	FTM_ERC20 //22

// 	SOL     //23
// 	SOL_SPL //24

// 	// pUnifined token:
// 	UNIFINE_TOKEN //25

// 	NEAR       //26
// 	NEAR_TOKEN //27

// 	AVAX       //28
// 	AVAX_ERC20 //29

// 	AURORA_ETH   //30
// 	AURORA_ERC20 //31
