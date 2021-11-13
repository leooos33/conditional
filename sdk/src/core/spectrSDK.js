const { Contract } = require("./contracts");


class SpectrSDK {
    constructor(web3, version) {
      this.web3 = web3;
      this.contract = new Contract(version, web3);
    }

    async placeOrder(account, token1, token2, x, p, deadline) {
      const res = await this.contract.instance.methods.placeOrder(
        token1,
        token2,
        x,
        p,
        deadline
      ).send({ from: account.address })
    }

    async buy() {
      //TODO: implement
    }

    async cancelOrder(){
      //TODO: implement
    }

    async linkOrders(){
      //TODO: implement
    }
    async getOrderBook(){
      //TODO: implement
    }
}

module.exports = {
    SpectrSDK,
}