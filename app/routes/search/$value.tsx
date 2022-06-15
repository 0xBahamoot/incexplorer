

import type { LoaderFunction } from "@remix-run/node";
import { checkHashValue } from "~/services/chains";
import { getTokenInfo } from "~/services/coinservice";
export const loader: LoaderFunction = async ({ params }) => {
    var value: any = params.value;
    try {
        const { Result, Error } = (await checkHashValue(value)) as any;
        console.log(Result, Error);
        // { IsBlock: false, IsBeaconBlock: false, IsTransaction: false }
        if (!(Result.IsBlock && Result.IsBeaconBlock && Result.IsTransaction)) {
            const { Result, Error } = (await getTokenInfo(value)) as any;
            console.log("Result2", Result, Error);
        }
        return Result
    } catch (error) {
        return "unable to find" + value
    }
};
