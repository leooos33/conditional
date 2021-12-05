/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { createStyles, withStyles } from "@mui/styles"
import { useEthers } from "@usedapp/core"
import { connect } from "react-redux"
import { tokenList } from "@web3"
import { toast } from "react-toastify"
import {
    getTransactionAlertMessage,
    TransactionAlertStatus,
    TransactionAlertContainer
} from "@components/popups/TransactionAlertContainer"
import { tokenContractsList } from "@hooks"

import TokenButton from "@components/shared/TokenButton"
import { setMintTokenAction } from "@state/actions"

const styles = () => createStyles({})

function MintWindow(props: any) {
    const { account } = useEthers()

    const [amountToMint, setAmountToMint] = useState(100)
    const [notifications, setNotificationsStateValues] = useState([])
    const [isAllowToThrowError, setAllowToThrowError] = useState(false)

    const handleAmountChange = (event: any) => {
        let newValue: string = event.target.value as string
        //TODO: validation
        newValue = newValue.replace(/-/gi, "")
        setAmountToMint(parseInt(newValue))
    }

    const useContractMethods = tokenContractsList.map((i: any) =>
        i.useContractMethod("unlimitedMint")
    )

    useEffect(() => {
        const status = useContractMethods[props.tokenId]?.state?.status
        const txHash =
            useContractMethods[props.tokenId]?.state?.transaction?.hash
        const _notif: any = notifications.find((n: any) => n.txHash === txHash)

        if (status === "Mining") {
            if (!_notif) {
                const alertId = toast.loading(
                    getTransactionAlertMessage(
                        TransactionAlertStatus.Started,
                        "mint"
                    )
                )
                const newNot: any = [...notifications, { alertId, txHash }]
                setNotificationsStateValues(newNot)
            }
        } else if (status === "Success") {
            if (notifications && _notif) {
                toast.dismiss(_notif.alertId)
                toast.success(
                    getTransactionAlertMessage(
                        TransactionAlertStatus.Succeeded,
                        "mint"
                    )
                )
                setNotificationsStateValues(
                    notifications.filter((i: any) => txHash !== i.txHash)
                )
            }
        }
    }, [props.tokenId, useContractMethods, notifications])

    useEffect(() => {
        if (!isAllowToThrowError) return
        const status = useContractMethods[props.tokenId]?.state?.status

        if (status === "Exception") {
            toast.error(
                getTransactionAlertMessage(
                    TransactionAlertStatus.Failed,
                    "mint"
                )
            )
            setAllowToThrowError(false)
        }
    }, [isAllowToThrowError, props.tokenId, useContractMethods])

    const handleTransaction = async () => {
        const { send } = useContractMethods[props.tokenId]
        send(account, amountToMint.toString()).then(() => {
            setAllowToThrowError(true)
        })
    }

    const selectedChanged = (i: number) => {
        props.changeToken(i)
    }

    return (
        <>
            <div className="body-font font-sans text-md font-semibold text-gray1 text-center ">
                <div className="container mx-auto flex px-5 pt-20 items-center justify-center flex-col">
                    <div className="lg:w-2/5 w-full">
                        {/*Swap Header */}
                        <div className="flex items-center flex-wrap pb-2 pl-3 mt-auto w-full">
                            <span className="inline-flex items-center">
                                Mint:
                            </span>
                            <span className="mr-3 inline-flex items-center ml-auto leading-none pr-3 py-1 ">
                                Balance:
                            </span>
                        </div>
                        {/*InputForm*/}
                        <form
                            className="w-full "
                            onSubmit={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <div className="flex items-center border-b border-t border-gray1-g66 py-1">
                                <TokenButton
                                    selectedToken={tokenList[props.tokenId]}
                                    selectedChanged={selectedChanged}
                                />
                                <input
                                    className="text-right appearance-none bg-transparent border-none w-full text-white text-2xl font-semibold text-white mr-3 my-1 pr-3 leading-tight focus:outline-none"
                                    type="number"
                                    min="0"
                                    placeholder="0.0"
                                    autoComplete="off"
                                    value={amountToMint}
                                    onChange={(e: any) => handleAmountChange(e)}
                                />
                            </div>
                        </form>
                    </div>
                    {/*SwapButton */}
                    <div className="container mx-auto flex py-32 items-center justify-center flex-col">
                        <div className="text-center w-2/5">
                            <div className="flex justify-center text-center">
                                <button
                                    className="bg-transparent w-full border-gray1-g66 border text-orange1 font-sans font-medium text-xl pt-2 pb-3 rounded-lg"
                                    onClick={() => handleTransaction()}
                                >
                                    Mint {amountToMint} of{" "}
                                    {tokenList[props.tokenId].name}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TransactionAlertContainer />
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        tokenId: state.mint.token
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeToken: (token: any) => {
            dispatch(setMintTokenAction(token))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true, index: 1 })(MintWindow))
