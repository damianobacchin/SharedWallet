require("dotenv").config();

const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const infura_endpoint = process.env.INFURA_ENDPOINT;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, infura_endpoint)
      },
      network_id: "3"
    }
  },
  compilers: {
    solc: {
      version: '0.8.9'
    }
  }
};
