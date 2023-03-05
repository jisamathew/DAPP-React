var userSignup = artifacts.require("UserSignup");

module.exports =async function(deployer) {
  deployer.deploy(userSignup);
};
