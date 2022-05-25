import { checkHashValue } from "./chains";

export const searchValue = async (content: string) => {
    const [Result, Error] = (await checkHashValue(content)) as any;
    return Result;
};