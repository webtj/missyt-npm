const path = require("path");
const { registryList } = require("../const");
const { readFile } = require("../utils");

const NPMRC = path.join(
  process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"],
  ".npmrc"
);
const NRMRC = path.join(
  process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"],
  ".nrmrc"
);

const getRegistryList = async () => {
  const customRegistries = await readFile(NRMRC);
  const registries = registryList.concat([customRegistries]);
  return registryList;
};

module.exports = {
  NPMRC,
  NRMRC,
  getRegistryList,
};
