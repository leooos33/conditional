
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
const dotenv = require('dotenv');

const envDir = __dirname.replace('tests', `test.env`);
const env = dotenv.parse(fs.readFileSync(envDir));

const infuraProjectId = env.infuraProjectId;
const myPrivateKeyHex = env.myPrivateKeyHex;

const { SpectrSDK, CONTRACT_VERSIONS } = require('../src')

const exampleToken1 = '0x177Bc802F383185e1b037B2fC18a6fcbB3f9F1B5';
const exampleToken2 = '0x21C7ceB046971b38e3E98b08b0ACAD0Baf1450E6';
 
(async() => {
    
    const provider = new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraProjectId}`);

    const localKeyProvider = new HDWalletProvider({
        privateKeys: [myPrivateKeyHex],
        providerOrUrl: provider,
    });
    const web3 = new Web3(localKeyProvider);

    const SDK = new SpectrSDK(web3, CONTRACT_VERSIONS.robston_1_0_0)
    
    const myAccount = web3.eth.accounts.privateKeyToAccount(myPrivateKeyHex);
    
    const res = await SDK.placeOrder(myAccount,
        exampleToken1,
        exampleToken2,
        [2,4,6,8,10],
        [1,2,3,4,5],
        9999999999
    );

    console.log(res);
})();
