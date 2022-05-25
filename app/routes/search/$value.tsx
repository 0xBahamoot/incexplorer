

import type { LoaderFunction } from "@remix-run/node";
import { checkHashValue } from "~/services/chains";
export const loader: LoaderFunction = async ({ params }) => {
    try {
        var value: any = params.value;
        const { Result, Error } = (await checkHashValue(value)) as any;
        console.log(Result, Error);
        return Result
    } catch (error) {
        return "not found"
    }
};
