import React from "react"

import USDC from "@assets/USDC.svg"
import expand_more from "@assets/expand_more.svg"
import expand_more_a from "@assets/expand_more_a.svg"
import direction from "@assets/direction.svg"

const MintPage = () => {
    return (
        <div className="body-font font-sans text-md font-semibold text-gray1 text-center ">
            <div className="container mx-auto flex px-5 pt-20 items-center justify-center flex-col">
                <div className="lg:w-2/5 w-full">
                    {/*Swap Header */}
                    <div className="flex items-center flex-wrap pb-2 pl-3 mt-auto w-full">
                        <span className="inline-flex items-center">
                            Swap from:
                        </span>
                        <span className="mr-3 inline-flex items-center ml-auto leading-none pr-3 py-1 ">
                            Balance:
                        </span>
                    </div>
                    {/*InputForm*/}
                    <form className="w-full ">
                        <div className="flex items-center border-b border-t border-gray1-g66 py-1">
                            <button
                                className="flex-shrink-0 inline-flex text-xl font-semibold text-white pl-2 pr-0 rounded"
                                type="button"
                            >
                                <img
                                    className="object-cover object-center mx-3"
                                    src={USDC}
                                    width="30x"
                                    height="30px"
                                />
                                ABC
                                <img
                                    className="object-cover object-center rounded"
                                    src={expand_more}
                                    alt={"expand_more"}
                                    width="30px"
                                    height="30px"
                                />
                            </button>
                            <div>
                                <button
                                    className="flex-shrink-0 inline-flex text-sm font-bold font-mono text-gray1-g66 py-0.5 border px-2.5 border-gray1-g66 rounded"
                                    type="button"
                                >
                                    MAX
                                </button>
                            </div>
                            <input
                                className="text-right appearance-none bg-transparent border-none w-full text-white text-2xl font-semibold text-white mr-3 my-1 pr-3 leading-tight focus:outline-none"
                                type="number"
                                min="0"
                                placeholder="0.0"
                                autoComplete="off"
                            />
                        </div>
                    </form>
                </div>
                {/*SwapButton */}
                <div className="container mx-auto flex py-32 items-center justify-center flex-col">
                    <div className="text-center w-2/5">
                        <div className="flex justify-center text-center">
                            <button className="bg-transparent w-full border-gray1-g66 border text-orange1 font-sans font-medium text-xl pt-2 pb-3 rounded-lg">
                                TEXT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MintPage
