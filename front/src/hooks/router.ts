/* eslint-disable react-hooks/rules-of-hooks */

import { Token, toToken } from "./testERC20ContractHook";
import { pairAddress, tokenList } from "../contracts";
import { BigNumber } from "@ethersproject/bignumber";
import Web3 from "web3";
import contractABI from "../abi/Pair.json";
import { AbiItem } from "web3-utils";

const token0 = tokenList[0].address;

// Put backend router API here
export function getPriceFromRouter(q: BigNumber, token: string) {
  if (!((token === token0 ? amount0 : amount1) >= q))
    return "SimpleTwoSidedTemplate: Not enogth liquidity";

  const curveLength: any = parseInt(params[0].toString());
  let start: any = token === token0 ? 1 : curveLength * 2 + 1;
  for (let i = curveLength - 1; i >= 0; i--) {
    let x_i: BigNumber = params[start + i];
    // console.log(x_i.toString());

    if (q.gt(x_i)) {
      if (i === curveLength - 1)
        return "SimpleTwoSidedTemplate: Requested value is greater than curve";

      let x_ii: BigNumber = params[start + i + 1];
      let p_i: BigNumber = params[start + curveLength + i];
      let p_ii: BigNumber = params[start + curveLength + i + 1];

      let price: any = p_ii
        .sub(p_i)
        .mul(q.sub(x_i))
        .div(x_ii.sub(x_i))
        .add(p_i);
      return price;
    }
  }
  return "SimpleTwoSidedTemplate: Amount is too small";
}
const amount0: any = Token(8);
const amount1: any = Token(40);

const params = [
  BigNumber.from(4),
  ...toToken([2, 4, 6, 8]),
  ...toToken([10, 20, 30, 40]),
  ...toToken([10, 20, 30, 40]),
  ...toToken([2, 4, 6, 8]),
];

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/02dc1b201ea0402eb4d789fb23b5ce6a"
  )
);

const pairContract: any = new web3.eth.Contract(
  contractABI as AbiItem[],
  pairAddress
);

// Put backend router API here
export async function getAmount(orderId: number) {
  const { amount0, amount1 } = await pairContract.methods
    .orders(orderId)
    .call();

  return {
    amount1: amount0,
    amount2: amount1,
    token1: { min: 2, max: 8 },
    token2: { min: 10, max: 40 },
  };
}
