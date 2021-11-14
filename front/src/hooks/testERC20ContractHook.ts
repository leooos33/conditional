/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import contractABI from "../abi/TestERC20Contract.json";
import { tokenList } from "../contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { isValidElement } from "react";
import { ConstructionRounded } from "@mui/icons-material";

const contractInterface = new ethers.utils.Interface(contractABI);

export const tokenContractsList = tokenList.map((i) => ({
  ...i,
  useContractMethod: function (methodName: string) {
    const contract = new Contract(i.address, contractInterface);
    const { state, send } = useContractFunction(contract, methodName, {});
    return { state, send };
  },
  useApprove: function () {
    const contract = new Contract(i.address, contractInterface);
    const { state, send } = useContractFunction(contract, "approve", {});
    return {
      state,
      send: (a: any) => send(a, maxApproval),
    };
  },
}));

export function useBlockchainParams() {
  const [timestamp]: any =
    useContractCall({
      abi: contractInterface,
      address: tokenList[0].address,
      method: "getBlockchainParams",
      args: [],
    }) ?? [];
  return timestamp ? timestamp.toNumber() : null;
}

// 2 ** 256 - 1
export const maxApproval: BigNumber = BigNumber.from(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"
);

const numDigits = 18;

export const toToken = (value: any[], digits?: number): BigNumber[] => {
  return value.map((i) => Token(i, digits));
};

export const Token = (
  value: string | number,
  digits = numDigits
): BigNumber => {
  if (value === 0 || value === "0" || !value) return BigNumber.from(0);

  value = parseFloat(value.toString());
  let [x, y] = value.toString().split(".");

  const a: any = BigNumber.from(x + "0".repeat(digits));
  if (y) {
    y = y.slice(0, digits);
    let zeros = digits - y.length;
    const b = BigNumber.from(y + (zeros > 0 ? "0".repeat(zeros) : ""));

    return a.add(b);
  } else return a;
};

export const _Token = (value: BigNumber): string => {
  console.log("_Token", value);
  if (value.toString() === "0") return "0";
  return value.div(BigNumber.from("1" + "0".repeat(numDigits))).toString();
};

export const isValidInput = (x: any) => {
  const err = isNaN(x) || !parseFloat(x);
  // console.log(!err, x);
  return !err;
};
