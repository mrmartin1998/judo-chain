// SPDX-License-Identifier: MIT
const JudokaRegistry= artifacts.require("JudokaRegistry");

module.exports = function (deployer) {
  deployer.deploy(JudokaRegistry);
};