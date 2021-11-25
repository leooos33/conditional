// /* eslint-disable no-undef */
// const SimpleTwoSidedTemplate = artifacts.require("SimpleTwoSidedTemplate");
// const { toToken, Token, _Token } = require("./helpers");

// const curve = [
//   ...[Token(1, 1), Token(4000), Token(6000), Token(8000)],
//   ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
//   ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
//   ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
// ];

// const order = {
//   owner: undefined,
//   templateId: 0,
//   params: [4, ...curve],
//   isValid: true,
//   deadline: 0,
//   amount0: 0,
//   amount1: 0,
// };

// contract("SimpleTwoSidedTemplate", (accounts) => {
//   order.owner = accounts[3];
//   let simpleTwoSidedTemplate;
//   const token0 = accounts[1];
//   const token1 = accounts[2];

//   it("Set up", async () => {
//     simpleTwoSidedTemplate = await SimpleTwoSidedTemplate.deployed();
//   });

//   it("Token1: Value Test 1", async () => {
//     const price = await simpleTwoSidedTemplate.getPrice(
//       Token(1),
//       token0,
//       order,
//       token0,
//       token1
//     );
//     assert.equal(_Token(price), "10002.5", "This test should not fail");
//   });

//   it("Token1: Value Test 2: Low boundary", async () => {
//     try {
//       await simpleTwoSidedTemplate.getPrice(
//         Token(0),
//         token0,
//         order,
//         token0,
//         token1
//       );
//     } catch (err) {
//       assert(
//         err.message.indexOf("The requested value is less than the curve"),
//         "This test should not fail"
//       );
//     }
//   });

//   it("Token1: Value Test 3", async () => {
//     const price = await simpleTwoSidedTemplate.getPrice(
//       Token(1, 1),
//       token0,
//       order,
//       token0,
//       token1
//     );
//     assert.equal(
//       _Token(price),
//       "10000.000000000000000025",
//       "This test should not fail"
//     );
//   });

//   it("Token1: Value Test 4: High boundary", async () => {
//     try {
//       await simpleTwoSidedTemplate.getPrice(
//         Token(8001),
//         token0,
//         order,
//         token0,
//         token1
//       );
//     } catch (err) {
//       assert(
//         err.message.indexOf("The requested value is greater than the curve"),
//         "This test should not fail"
//       );
//     }
//   });

//   it("Token1: Value Test 5", async () => {
//     const price = await simpleTwoSidedTemplate.getPrice(
//       Token(8000),
//       token0,
//       order,
//       token0,
//       token1
//     );
//     assert.equal(_Token(price), "40000", "This test should not fail");
//   });

//   it("Token2: Value Test 1", async () => {
//     const price = await simpleTwoSidedTemplate.getPrice(
//       Token(10000, 1),
//       token0,
//       order,
//       token0,
//       token1
//     );
//     assert.equal(
//       _Token(price),
//       "10000.00000000000025",
//       "This test should not fail"
//     );
//   });

//   it("Token2: Value Test 2: Low boundary", async () => {
//     try {
//       await simpleTwoSidedTemplate.getPrice(
//         Token(10000 - 1, 1),
//         token0,
//         order,
//         token0,
//         token1
//       );
//     } catch (err) {
//       assert(
//         err.message.indexOf("The requested value is less than the curve"),
//         "This test should not fail"
//       );
//     }
//   });

//   it("Token2: Value Test 3", async () => {
//     const price = await simpleTwoSidedTemplate.getPrice(
//       Token(1),
//       token0,
//       order,
//       token0,
//       token1
//     );
//     assert.equal(_Token(price), "10002.5", "This test should not fail");
//   });

//   it("Token2: Value Test 4: High boundary", async () => {
//     try {
//       await simpleTwoSidedTemplate.getPrice(
//         Token(40001),
//         token0,
//         order,
//         token0,
//         token1
//       );
//     } catch (err) {
//       assert(
//         err.message.indexOf("The requested value is greater than the curve"),
//         "This test should not fail"
//       );
//     }
//   });

//   it("Token2: Value Test 5", async () => {
//     const price = await simpleTwoSidedTemplate.getPrice(
//       Token(40000),
//       token0,
//       order,
//       token0,
//       token1
//     );
//     assert.equal(_Token(price), "40000", "This test should not fail");
//   });
// });
