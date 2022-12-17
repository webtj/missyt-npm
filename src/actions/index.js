const {
  NPMRC,
  NRMRC,
  getRegistryList,
  getCurrentRegistry,
} = require("../config");
const {
  log,
  underlineColor,
  errorColor,
  successColor,
  warnColor,
  writeNpmFile,
  readNpmFile,
  magentaColor,
} = require("../utils");
const request = require("request");
//命令行展示所有的镜像源
const listAction = async (test = true) => {
  const registryList = await getRegistryList();
  log.info(
    "☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂ registry List ☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂☂\n"
  );
  log.tips("⏸ You can use the command to switch the registry:");
  log.magenta("  * prm use taobao  <recommend> \n");
  Object.keys(registryList).forEach((key) => {
    const item = registryList[key];
    const start = Date.now();
    if (test) {
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
            `${fontColor(`⏺`)} ${key} ${underlineColor(
              `${item.registry} ${fontColor(`(${time}ms) ${err || ""}`)}`
            )} `
          );
        }
      );
    } else {
      log.magenta(
        `${successColor(`⏺`)} ${key} ${underlineColor(`${item.registry}`)} `
      );
    }
  });
};

//使用npm源
const useAction = async (registryName) => {
  const registryList = await getRegistryList();
  const registry = registryList[registryName];
  if (!registry) {
    log.error(`✖️ The registry ${registryName} does not exist!!`);
    listAction();
    return;
  }
  log.tips(
    `⏸ You are using the registry ${magentaColor(
      registryName
    )} (${underlineColor(registry.registry)})`
  );
  let npmrc = await readNpmFile(NPMRC);
  await writeNpmFile(NPMRC, Object.assign(npmrc, registry));
  log.success(`✔️ use registry ${registryName} successfully!!`);
};

//获取当前源
const currAction = async () => {
  const registry = await getCurrentRegistry();
  log.magenta(`♥️ You are using : ${underlineColor(registry)} `);
};

//增加源
const addAction = async (name, registry, home) => {
  const registryList = await getRegistryList();
  if (registryList[name]) {
    log.error(`✖️ The registry ${name} already exists!!`);
    return;
  }
  registryList[name] = {
    registry,
    home,
  };
  await writeNpmFile(NRMRC, registryList);
  log.success(`✔️ add registry ${name} successfully!!`);
  log.magenta(`▶️ run ${underlineColor("prm use " + name)} to change registry`);
};

//删除源
const delAction = async (name) => {
  const registryList = await getRegistryList();
  if (!registryList[name]) {
    log.error(`✖️ The registry ${name} does not exist!!`);
    return;
  }
  delete registryList[name];
  await writeNpmFile(NRMRC, registryList);
  log.success(`✔️ delete registry ${name} successfully!!`);
};

module.exports = {
  listAction,
  useAction,
  currAction,
  addAction,
  delAction,
};
