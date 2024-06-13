// SPDX-License-Identifier: MIT
const CONTRACT= artifacts.require("CONTRACT");

module.exports = function (deployer) {
  deployer.deploy(CONTRACT);
};