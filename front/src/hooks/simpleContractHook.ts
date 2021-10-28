import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import simpleContractAbi from "../abi/SimpleContract.json";

const simpleContractInterface = new ethers.utils.Interface(simpleContractAbi);
const simpleContractAddress = "0xb3F8b6f4Ad8D811059587BA535AD4813Afa49Bb5";

const contract = new Contract(simpleContractAddress, simpleContractInterface);

export function useCount() {
  const [count]: any =
    useContractCall({
      abi: simpleContractInterface,
      address: simpleContractAddress,
      method: "count",
      args: [],
    }) ?? [];
  return count;
}

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(contract, methodName, {});
  return { state, send };
}
