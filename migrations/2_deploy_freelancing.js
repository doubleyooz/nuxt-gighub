const Freelancing = artifacts.require("Freelancing");

module.exports = function (deployer) {
  deployer.deploy(Freelancing, Date.now() + 333333);
};
