/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import contractABI from "../abi/TestERC20Contract.json";
import { tokenList } from "../contracts";

const contractInterface = new ethers.utils.Interface(contractABI);

export const tokenContractsList = tokenList.map((i) => ({
  ...i,
  useContractMethod: function (methodName: string) {
    const contract = new Contract(i.address, contractInterface);
    const { state, send } = useContractFunction(contract, methodName, {});
    return { state, send };
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

export const tokenDigits = 100000000000000000000;
export const maxApproval = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

// export const tokenDigits = 10;

// const contractA = new Contract(
//   tokenList[0].address,
//   contractInterface
// );

// export function mintTokenA() {
//   const { state, send } = useContractFunction(contractA, "unlimitedMint", {});
//   return { state, send };
// }
