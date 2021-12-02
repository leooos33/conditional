/* eslint-disable react-hooks/rules-of-hooks */
import { tokenList, pairAddress } from "@web3"
import { connect } from "react-redux"
import { setSwapInfoAction } from "@state/actions"
import { useEffect, useState } from "react"
import { updateSwapInfo } from "../../hooks"
import { useEthers } from "@usedapp/core"

import SwapWindow from "./SwapWindow"
import { TransactionAlertContainer } from "../popups/TransactionAlertContainer"

const SwapPage = (props: any) => {
    const [loading, setLoading] = useState(false)
    const [snapshot, setSnapshot]: any = useState({})

    const { account } = useEthers()

    const tokenToSellValue = props.token1_value

    useEffect(() => {
        const interval = setInterval(async () => {
            const orderInfo: any = {
                q: tokenToSellValue,
                token: tokenList[props.token1].address,
                senderAddress: account,
                pairAddress
            }
            const isSmthChanged = (orderInfo: any) => {
                if (
                    snapshot.q === orderInfo.q &&
                    snapshot.token === orderInfo.token &&
                    snapshot.senderAddress === orderInfo.senderAddress &&
                    snapshot.tokenToSell === orderInfo.tokenToSell
                )
                    return false
                setSnapshot(orderInfo)
                return true
            }
            const is = isSmthChanged(orderInfo)
            console.log(is)
            if (is) {
                setLoading(true)
                const info = await updateSwapInfo(
                    tokenToSellValue,
                    tokenList[props.token1].address,
                    account,
                    pairAddress
                )
                setLoading(false)
                props.setSwapInfo(info)
            }
        }, 200)
        return () => clearInterval(interval)
    }, [props, tokenToSellValue, account, snapshot])

    return (
        <>
            <TransactionAlertContainer />
            <SwapWindow loading={loading} />
        </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        token1: state.swap.token1,
        token1_value: state.swap.token1_value
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setSwapInfo: (amount: any) => {
            dispatch(setSwapInfoAction(amount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapPage)
