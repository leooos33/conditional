// /* eslint-disable no-undef */
// const OrderBook = artifacts.require("OrderBook");
// const CustomERC20Token = artifacts.require("CustomERC20Token");

// contract('OrderBook', (accounts) => {

//   let tokenA;
//   let tokenB;
//   let orderBookInstance;

//   // Addresses
//   let orderBookAddress;
//   const Alice = accounts[0];
//   const Bob = accounts[1];

//   before(() => {});

//   it('Set Up Tests', async () => {
//     orderBookInstance = await OrderBook.deployed();
//     orderBookAddress = orderBookInstance.address;

//     tokenA = await CustomERC20Token.new("My Token A", "TKNA", { from: accounts[3] });
//     tokenB = await CustomERC20Token.new("My Token B", "TKNB", { from: accounts[3] });

//     assert.equal(await tokenA.symbol(), 'TKNA', "This test should not fail");
//     assert.equal(await tokenB.symbol(), 'TKNB', "This test should not fail");

//     assert.equal((await orderBookInstance.getLastOrderId.call()).toString(10), 0, "This test should not fail");

//     await tokenA.unlimitedMint(Alice, 100);
//     await tokenB.unlimitedMint(Alice, 100);
//     await tokenB.unlimitedMint(Bob, 100);
//   });

//   it('Place 2 Order Testing', async () => {

//     await tokenA.increaseAllowance(orderBookAddress, 100, { from: Alice });
//     await tokenB.increaseAllowance(orderBookAddress, 100, { from: Alice });
//     let timestamp = parseInt((await tokenA.getBlockchainParams()).toString(10));

//     try {
//       await orderBookInstance.placeOrder(
//         tokenA.address,
//         tokenB.address,
//         [2,4,6,8,10],
//         [1,2,3,4,5],
//         timestamp + 10000000,
//         { from: Alice }
//       );
//       await orderBookInstance.placeOrder(
//         tokenB.address,
//         tokenA.address,
//         [2,4,6,8,10],
//         [1,2,3,4,5],
//         timestamp + 10000000,
//         { from: Alice }
//       );
//     } catch(err) {
//       console.log(err);
//     }

//     console.log(">>After placeOrder");
//     await getBlockchainStatus();
//   });

//   it('Link Orders Testing', async () => {
//     await orderBookInstance.linkOrders(0, 1, { from: Alice });
//   });

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
// });
