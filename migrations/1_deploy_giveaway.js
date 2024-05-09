const Giveaway = artifacts.require("Giveaway");

module.exports = function (deployer) {
  deployer.deploy(Giveaway);
};
