const { NPMRC, NRMRC, getRegistryList } = require("../config");
const {
  log,
  underlineColor,
  errorColor,
  successColor,
  warnColor,
  writeFile,
} = require("../utils");
const request = require("request");
//命令行展示所有的镜像源
const listAction = async () => {
  const registryList = await getRegistryList();
  console.log();
  log.tips("⏸ You can use the command to switch the registry:");
  log.magenta("  prm use taobao(recommend) or <registryName>");
  console.log();
  registryList.forEach((item) => {
    const start = Date.now();
    request(
      {
        url: item.registry,
        method: "GET",
        timeout: 5000,
      },
      (err, res, body) => {
        const end = Date.now();
        const time = end - start;
        let fontColor = time > 500 ? warnColor : successColor;
        if (err) fontColor = errorColor;
        log.magenta(
          `${fontColor(`⏺`)} ${item.label} ${underlineColor(
            `${item.registry} ${fontColor(`(${time}ms) ${err || ""}`)}`
          )} `
        );
      }
    );
  });
};

//使用npm源
const useAction = async (registryName) => {
  const registryList = await getRegistryList();
  const registry = registryList.find((item) => item.label === registryName);
  if (!registry) {
    log.error(`✖️ The registry ${registryName} does not exist!!`);
    listAction();
    return;
  }
  log.tips(`⏸ You are using the registry ${registry.label}`);
  log.tips(`⏸ The registry url is ${registry.registry}`);

  write;
};

module.exports = {
  listAction,
  useAction,
};
