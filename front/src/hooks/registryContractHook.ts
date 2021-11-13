import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import contractABI from "../abi/Registry.json";
import { registryContractAddress } from "../contracts";

const contractInterface = new ethers.utils.Interface(contractABI);
const contractAddress = registryContractAddress;

const contract = new Contract(contractAddress, contractInterface);

export function useCreatePair() {
  const { state, send } = useContractFunction(contract, "createPair", {});
  return { state, send };
}

export function useGetPair(i: number) {
  const res: any =
    useContractCall({
      abi: contractInterface,
      address: contractAddress,
      method: "allPairs",
      args: [i],
    }) ?? [];
  return res;
}
