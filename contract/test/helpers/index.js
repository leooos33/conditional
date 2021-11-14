const { BigNumber } = require("@ethersproject/bignumber");

const defaultErrMsg = "This test should not fail";

const digits = 18;

const toToken = (value) => {
  return value.map((i) => Token(i, digits));
};

const Token = (value) => {
  if (value === 0 || value === "0" || !value) return BigNumber.from(0);

  value = parseFloat(value.toString());
  let [x, y] = value.toString().split(".");

  const a = BigNumber.from(x + "0".repeat(digits));
  if (y) {
    y = y.slice(0, digits);
    let zeros = digits - y.length;
    const b = BigNumber.from(y + (zeros > 0 ? "0".repeat(zeros) : ""));

    return a.add(b);
  } else return a;
};

const mapper = (obj) => {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] == "string") continue;
    obj[key] = parseInt(obj[key]);
  }
  return obj;
};

module.exports = { defaultErrMsg, digits, toToken, mapper };

//   async function getBlockchainStatus(){
//     const tA_b_Alice = (await tokenA.balanceOf(Alice)).toString(10);
//     const tB_b_Alice = (await tokenB.balanceOf(Alice)).toString(10);

//     console.log('tokenA >> balance >> Alice:', tA_b_Alice);
//     console.log('tokenB >> balance >> Alice:', tB_b_Alice);

//     const tA_b_Bob = (await tokenA.balanceOf(Bob)).toString(10);
//     const tB_b_Bob = (await tokenB.balanceOf(Bob)).toString(10);

//     console.log('tokenA >> balance >> Bob:', tA_b_Bob);
//     console.log('tokenB >> balance >> Bob:', tB_b_Bob);

//     const tA_a_Ob = (await tokenA.allowance(Alice, orderBookAddress)).toString(10);
//     const tA_b_Ob = (await tokenA.balanceOf(orderBookAddress)).toString(10);

//     console.log('tokenA >> allow >> Contact:', tA_a_Ob);
//     console.log('tokenA >> balance >> Contact:', tA_b_Ob);

//     const tB_a_Ob = (await tokenB.allowance(Bob, orderBookAddress)).toString(10);
//     const tB_b_Ob = (await tokenB.balanceOf(orderBookAddress)).toString(10);

//     console.log('tokenB >> allow >> Contact:', tB_a_Ob);
//     console.log('tokenB >> balance >> Contact:', tB_b_Ob);

//     return {
//       tA_b_Alice,
//       tB_b_Alice,
//       tA_b_Bob,
//       tB_b_Bob,
//       tA_a_Ob,
//       tA_b_Ob,
//       tB_a_Ob,
//       tB_b_Ob
//     }
//   }
