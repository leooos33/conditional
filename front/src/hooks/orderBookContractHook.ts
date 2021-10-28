import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import contractABI from "../abi/OrderBookContact.json";
import { orderBookContractAddress } from "../contracts";

const contractInterface = new ethers.utils.Interface(contractABI);
const contractAddress = orderBookContractAddress;

const contract = new Contract(contractAddress, contractInterface);

export function useBuy() {
  const { state, send } = useContractFunction(contract, "buy", {});
  return { state, send };
}

export function usePlaceOrder() {
  const { state, send } = useContractFunction(contract, "placeOrder", {});
  return { state, send };
}

export function useGetOrder(order_id: number) {
  const res: any =
    useContractCall({
      abi: contractInterface,
      address: contractAddress,
      method: "orders",
      args: [order_id],
    }) ?? [];
  return res;
}
