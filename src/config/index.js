const path = require("path");
const { registryList } = require("../const");
const { readNpmFile } = require("../utils");

const NPMRC = path.join(
  process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"],
  ".npmrc"
);
const NRMRC = path.join(
  process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"],
  ".nrmrc"
);

const getRegistryList = async () => {
  const customRegistries = await readNpmFile(NRMRC);
  return Object.assign({}, registryList, customRegistries);
};

const getCurrentRegistry = async () => {
  const customRegistries = await readNpmFile(NPMRC);
  return customRegistries.registry;
};

module.exports = {
  NPMRC,
  NRMRC,
  getRegistryList,
  getCurrentRegistry,
};
