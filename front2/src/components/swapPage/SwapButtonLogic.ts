import { isValidInput, Token } from "../../hooks"

export const getSwapButtonLogic = (state: any) => {
    const {
        loading,
        tokenToSellValue,
        info,
        token1_name,
        tokenToSellBalance,
        token1_value,
        handleTransactionApprove,
        handleTransaction
    } = state

    let buttonText = ""
    let handleClick = () => {}
    if (loading) {
        buttonText = "Loading..."
    } else if (!isValidInput(tokenToSellValue)) {
        buttonText = "Enter the amount"
    } else if (isValidInput(tokenToSellValue) && !info?.price) {
        buttonText = "Not enough liquidity"
    } else if (
        info?.allowance &&
        info?.price &&
        info.allowance.lt(info?.price)
    ) {
        buttonText = `Approve ${token1_name}`
        handleClick = handleTransactionApprove
    } else if (
        info?.allowance &&
        info?.price &&
        info.allowance.gte(info?.price) &&
        tokenToSellBalance?.lt(Token(token1_value))
    ) {
        buttonText = "Balance is not enough"
    } else if (
        info?.allowance &&
        info?.price &&
        info.allowance.gte(info?.price) &&
        tokenToSellBalance?.gte(Token(token1_value))
    ) {
        buttonText = "buy"
        handleClick = handleTransaction
    }
    return {
        buttonText,
        handleClick
    }
}
