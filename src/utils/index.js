const chalk = require("chalk");
const { textSync } = require("figlet");
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

module.exports = {
  showLogo,
  log,
  errorColor: chalk.red,
  successColor: chalk.green,
  warnColor: chalk.yellow,
  infoColor: chalk.blue,
  magentaColor: chalk.magenta,
  underlineColor: chalk.underline.blueBright.bold,
};
