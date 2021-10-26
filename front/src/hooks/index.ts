import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import orderBookContractAbi from "../abi/OrderBookContact.json";
import { orderBookContractAddress } from "../contracts";

const orderBookContractInterface = new ethers.utils.Interface(
  orderBookContractAbi
);

export function useCount() {
  const [count]: any =
    useContractCall({
      abi: orderBookContractInterface,
      address: orderBookContractAddress,
      method: "count",
      args: [],
    }) ?? [];
  return count;
}

const contract = new Contract(
  orderBookContractAddress,
  orderBookContractInterface
);

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(contract, methodName, {});
  return { state, send };
}
