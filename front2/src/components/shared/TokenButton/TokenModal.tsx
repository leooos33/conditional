/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react"

import highlight_off from "@assets/highlight_off.svg"
import search from "@assets/search.svg"
import { tokenList } from "@web3"
import { useEthers } from "@usedapp/core"
import { getAllTokenBallances } from "@hooks/router/getBalance"
import { _Token } from "@hooks"

const TokenModal = (props: any) => {
    const setShowModal = props.setShowModal
    const selectedChanged = props.selectedChanged
    const [accountTokenList, setAccountTokenList] = React.useState(tokenList)
    const { account } = useEthers()

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (account) {
                const accountTokenList = await getAllTokenBallances(
                    account as string
                )
                setAccountTokenList(accountTokenList)
            }
        }, 100)
        return () => clearTimeout(timeout)
    }, [account])

    useEffect(() => {
        const interval = setInterval(async () => {
            if (account) {
                const accountTokenList = await getAllTokenBallances(
                    account as string
                )
                setAccountTokenList(accountTokenList)
            }
        }, 4000)
        return () => clearInterval(interval)
    }, [account])

    return (
        <>
            <div className="justify-center items-center flex fixed inset-0 pb-24 z-50 outline-none focus:outline-none font-sans">
                <div
                    className="absolute w-screen h-screen"
                    onClick={() => setShowModal(false)}
                ></div>

                <div className="absolute w-1/4 px-5 mx-auto">
                    {/*content*/}
                    <div className="border-gray1 border rounded-lg shadow-xl relative flex flex-col w-full bg-black1 outline-none focus:outline-none items-center ">
                        {/*Modal header*/}
                        <div className="flex items-center flex-wrap px-1 w-11/12 ">
                            <span className="inline-flex items-center text-xl text-orange1 ">
                                Choose a token
                            </span>
                            <span className="inline-flex items-center py-2 ml-auto leading-none">
                                <button
                                    className="background-transparent"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    <img
                                        className="object-cover object-center rounded"
                                        src={highlight_off}
                                        width="30px"
                                        height="30px"
                                    />
                                </button>
                            </span>
                        </div>

                        {/*Modal body*/}
                        <form className="w-full ">
                            <div className="flex items-center border-b border-t border-gray1-g66 mx-5 py-3">
                                <img
                                    className="object-cover object-center "
                                    src={search}
                                    width="30x"
                                    height="30px"
                                />
                                <input
                                    className="text-right appearance-none bg-transparent w-full text-white text-xl font-semibold my-1 leading-tight focus:outline-none placeholder-color-gray1-g33"
                                    type="text"
                                    placeholder="Search name or paste address"
                                    autoComplete="off"
                                />
                            </div>
                        </form>

                        <div className=" w-full px-5 ml-1 h-96 overflow-y-auto">
                            {accountTokenList?.map((cur: any, i: number) => {
                                return (
                                    <div
                                        className="flex my-1 py-2 text-lg text-white"
                                        onClick={() => {
                                            setShowModal(false)
                                            selectedChanged(i)
                                        }}
                                    >
                                        <img
                                            className="object-center mr-2"
                                            src={cur.src}
                                            width="30x"
                                            height="30px"
                                        />
                                        {cur.name}
                                        <span className="inline-flex ml-auto ">
                                            {cur.balance
                                                ? _Token(cur.balance)
                                                : ""}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default TokenModal
function useForm(): { register: any; handleSubmit: any } {
    throw new Error("Function not implemented.")
}
