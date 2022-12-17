const chalk = require("chalk");
const { textSync } = require("figlet");
const ini = require("ini");
const fs = require("fs");

//展示项目logo
const showLogo = (logoName) => {
  return chalk.green(textSync(logoName, { horizontalLayout: "full" }));
};

//打印日志
const log = {
  success: (...msg) => console.log(chalk.green(...msg)),
  error: (...msg) => console.log(chalk.red(...msg)),
  info: (...msg) => console.log(chalk.blue(...msg)),
  warn: (...msg) => console.log(chalk.yellow(...msg)),
  tips: (...msg) => console.log(chalk.cyan(...msg)),
  magenta: (...msg) => console.log(chalk.magenta(...msg)),
  underline: (...msg) => console.log(chalk.underline.blueBright.bold(...msg)),
  default: (...msg) => console.log(chalk.white(...msg)),
};

async function readNpmFile(file) {
  return new Promise((resolve) => {
    if (!fs.existsSync(file)) {
      resolve({});
    } else {
      try {
        const content = JSON.stringify(
          ini.parse(fs.readFileSync(file, "utf-8"))
        );
        resolve(JSON.parse(content));
      } catch (error) {
        log.error(error);
        process.exit(1);
      }
    }
  });
}

async function writeNpmFile(path, content) {
  return new Promise((resolve) => {
    try {
      fs.writeFileSync(path, ini.stringify(content));
      resolve();
    } catch (error) {
      exit(error);
    }
  });
}

module.exports = {
  showLogo,
  log,
  errorColor: chalk.red,
  successColor: chalk.green,
  warnColor: chalk.yellow,
  infoColor: chalk.blue,
  magentaColor: chalk.magenta,
  underlineColor: chalk.underline.blueBright.bold,
  readNpmFile,
  writeNpmFile,
};
