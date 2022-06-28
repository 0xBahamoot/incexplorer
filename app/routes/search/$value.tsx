

import type { LoaderFunction } from "@remix-run/node";
import { checkHashValue } from "~/services/chains";
import { getTokenInfo, getVerifyTokenList } from "~/services/coinservice";
import { TokenInfo } from "~/types/types";
export const loader: LoaderFunction = async ({ params }) => {
    var value: any = params.value;
    try {
        const { Result, Error } = (await checkHashValue(value)) as any;
        console.log(Result, Error);
        // { IsBlock: false, IsBeaconBlock: false, IsTransaction: false }
        if (!(Result.IsBlock && !Result.IsBeaconBlock && !Result.IsTransaction)) {
            const { Result, Error } = (await getTokenInfo(value)) as any;
            if (Result.length > 0) {
                return Result[0]
            }
        }
        return Result
    } catch (error) {
        //check if it is token name
        if (value.length <= 5) {
            try {
                const { Result, Error } = (await getVerifyTokenList()) as any;
                let tokenList: TokenInfo[] = [];
                if (Result.length > 0) {
                    Result.forEach((element: any) => {
                        let sym: string = element.Symbol;
                        if (sym.toLocaleLowerCase().search(value.toLocaleLowerCase()) >= 0) {
                            tokenList.push(element)
                        }
                    });
                }
                return tokenList
            } catch (error) {
                return "unable to find " + value
            }
        } else {
            return "unable to find " + value
        }

    }
};
