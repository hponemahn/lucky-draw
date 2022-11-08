const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const mnemonicPhrase = ""; // 12 word mnemonic
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl: "",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  console.log(JSON.stringify(abi));
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
