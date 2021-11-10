var WalletContract = artifacts.require("./WalletContract.sol");

module.exports = function(deployer) {
  deployer.deploy(WalletContract);
};
