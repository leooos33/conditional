import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import contractABI from "../abi/OrderBookContact.json";
import { orderBookContractAddress } from "../contracts";

const contractInterface = new ethers.utils.Interface(contractABI);
const contractAddress = orderBookContractAddress;

const contract = new Contract(contractAddress, contractInterface);

export function useCount() {
  const [count]: any =
    useContractCall({
      abi: contractInterface,
      address: contractAddress,
      method: "count",
      args: [],
    }) ?? [];
  return count;
}

export function useBuy() {
  const { state, send } = useContractFunction(contract, "buy", {});
  return { state, send };
}
