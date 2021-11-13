const defaultErrMsg = "This test should not fail";

const digits = 1000000000000000000;

const toToken = (value) => {
  if (Array.isArray(value)) {
    return value.map((i) => (i * digits).toString());
  }
  return (value * digits).toString();
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
