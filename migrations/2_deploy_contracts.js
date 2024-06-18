// SPDX-License-Identifier: MIT
const JudokaRegistry = artifacts.require("JudokaRegistry");
const VotingContract = artifacts.require("VotingContract");

module.exports = async function (deployer) {
  await deployer.deploy(JudokaRegistry);
  const judokaRegistryInstance = await JudokaRegistry.deployed();

  await deployer.deploy(VotingContract, judokaRegistryInstance.address);
};
