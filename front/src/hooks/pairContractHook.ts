import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import contractABI from "../abi/Pair.json";
import { registryContractAddress } from "../contracts";

const contractInterface = new ethers.utils.Interface(contractABI);

export function useBuy(pairContractAddress: string) {
  const contract = new Contract(
    pairContractAddress || "0xc4C826f6807f9e0f087BF7D1597b48a1fa57EFB4",
    contractInterface
  );
  const { state, send } = useContractFunction(contract, "buy", {});
  return { state, send };
}

export function usePlaceOrder(pairContractAddress: string) {
  const contract = new Contract(
    pairContractAddress || registryContractAddress,
    contractInterface
  );
  const { state, send } = useContractFunction(contract, "placeOrder", {});
  return { state, send };
}

export function useProvideLiquidity(pairContractAddress: string) {
  const contract = new Contract(
    pairContractAddress || registryContractAddress,
    contractInterface
  );
  const { state, send } = useContractFunction(contract, "provideLiquidity", {});
  return { state, send };
}

export function useGetOrder(pairContractAddress: string, id: number) {
  const res: any = useContractCall({
    abi: contractInterface,
    address: pairContractAddress,
    method: "orders",
    args: [id],
  });
  return res;
}
