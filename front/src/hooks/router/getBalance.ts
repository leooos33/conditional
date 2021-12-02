/* eslint-disable react-hooks/rules-of-hooks */

import tokenContractABI from "@web3/abi/TestERC20Contract.json"
import { AbiItem } from "web3-utils"
import { tokenList } from "@web3"
import { web3Connect } from "./connector"

export const getAllTokenBallances = async (account: string) => {
    if (!account) return []
    const accountTokenList: any = [...tokenList]
    for (const i of accountTokenList) {
        const ballance = await getTokenBallance(account, i.address)
        i.balance = ballance
    }
    return accountTokenList
}
export const getTokenBallance = (
    account: string,
    tokenAddress: string
): Promise<any> => {
    const tokenContract: any = new web3Connect.eth.Contract(
        tokenContractABI as AbiItem[],
        tokenAddress
    )
    return new Promise((res, _) => {
        tokenContract.methods
            .balanceOf(account)
            .call()
            .then((result: any) => res(result))
            .catch((err: any) => {
                console.error("getAllowance", err)
                res(0)
            })
    })
}
