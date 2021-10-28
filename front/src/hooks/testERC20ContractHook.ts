/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import contractABI from "../abi/TestERC20Contract.json";
import { tokenList } from "../contracts";

const contractInterface = new ethers.utils.Interface(contractABI);

// export const tokenContractsList = tokenList.map((i) => ({
//   ...i,
//   useContractMethod: function (methodName: string) {
//     const contract = new Contract(i.address, contractInterface);
//     const { state, send } = useContractFunction(contract, methodName, {});
//     return { state, send };
//   },
// }));

export function useBlockchainParams() {
  const [timestamp]: any =
    useContractCall({
      abi: contractInterface,
      address: "0xEcA2289219929357bE45f808ecd8e03E62C46e12",
      method: "getBlockchainParams",
      args: [],
    }) ?? [];
  return timestamp ? timestamp.toNumber() : null;
}

const contractA = new Contract(
  "0xEcA2289219929357bE45f808ecd8e03E62C46e12",
  contractInterface
);

export function mintTokenA() {
  const { state, send } = useContractFunction(contractA, "unlimitedMint", {});
  return { state, send };
}
