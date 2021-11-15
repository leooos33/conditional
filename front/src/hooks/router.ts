/* eslint-disable react-hooks/rules-of-hooks */

import { isValidInput, Token, toToken } from "./testERC20ContractHook";
import { pairAddress, templates, tokenList } from "../contracts";
import { BigNumber } from "@ethersproject/bignumber";
import Web3 from "web3";
import contractABI from "../abi/Pair.json";
import templateContractABI from "../abi/Template.json";
import tokenContractABI from "../abi/TestERC20Contract.json";
import { AbiItem } from "web3-utils";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/02dc1b201ea0402eb4d789fb23b5ce6a"
  )
);

const pairContract: any = new web3.eth.Contract(
  contractABI as AbiItem[],
  pairAddress
);

const templateContract: any = new web3.eth.Contract(
  templateContractABI as AbiItem[],
  templates[1].address
);

const snapshot: any = {};
export const orderId = 5;

//TODO: Optimize this, update only updated stuff
//TODO: DO smth with big number
export async function updateSwapInfo(
  q: any,
  token: string,
  senderAddress: any,
  tokenToPay: string,
  pairAddress: any
) {
  console.log(">", senderAddress);
  if (
    snapshot.q === q &&
    snapshot.token === token &&
    snapshot.senderAddress === senderAddress &&
    snapshot.tokenToPay === tokenToPay
  )
    return;
  console.log(">>>");
  snapshot.q = q;
  snapshot.token = token;
  snapshot.senderAddress = senderAddress;
  snapshot.tokenToPay = tokenToPay;

  const amount = await pairContract.methods.orders(orderId).call();

  const { amount0, amount1 } = amount;

  let price;
  let allowance;
  if (amount && isValidInput(q)) {
    price = await getPrice(amount, q, token);
    console.log(price);
    allowance = await getAllowance(tokenToPay, senderAddress, pairAddress);
  }

  return {
    amount1: amount0 ? BigNumber.from(amount0) : amount0,
    amount2: amount1 ? BigNumber.from(amount1) : amount1,
    price: price ? BigNumber.from(price) : price,
    allowance: allowance ? BigNumber.from(allowance) : allowance,
  };
}

const getAllowance = async (token: any, owner: any, spender: any) => {
  const tokenContract: any = new web3.eth.Contract(
    tokenContractABI as AbiItem[],
    token
  );
  return new Promise((res, rej) => {
    tokenContract.methods
      .allowance(owner, spender)
      .call()
      .then((result: any) => res(result))
      .catch((err: any) => {
        console.error(err);
        res(0);
      });
  });
};

const options: any = [
  4,
  ...toToken([0, 4000, 6000, 8000]),
  ...toToken([10000, 20000, 30000, 40000]),
  BigNumber.from("10000"),
  ...toToken([20000, 30000, 40000]),
  BigNumber.from("1"),
  ...toToken([0, 4000, 6000, 8000]),
];

const getPrice = (amount: any, q: any, token: string) => {
  const templateOrder = {
    owner: token,
    templateId: 1,
    params: options,
    amount0: amount.amount0,
    amount1: amount.amount1,
    isValid: true,
    deadline: 0,
  };
  // console.log(amount.amount0, amount.amount1);
  // console.log(token, tokenList[0].address);
  q = parseFloat(q);

  return new Promise((res, rej) => {
    templateContract.methods
      .getPrice(
        Token(q),
        token,
        templateOrder,
        tokenList[0].address,
        tokenList[1].address
      )
      .call()
      .then((result: any) => res(result))
      .catch((err: any) => {
        console.error(err);
        res(undefined);
      });
  });
};
