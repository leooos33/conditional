const CONTRACT_VERSIONS = {
  'ropsten_1_0_0': {
    abi: 'ropsten_1_0_0',
    address: '0x006f7d0C4527b568B4B2c94FdaE386711ABE16C5',
  }
};


class Contract {
    constructor(version, web3) {
      this.abi = require(`../abi/${version.abi}.json`)
      this.address = version.address;
      this.instance = new web3.eth.Contract(this.abi, this.address);
    }
}

module.exports = {
    Contract,
    CONTRACT_VERSIONS
}