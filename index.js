const commander = require("commander");
const pkg = require("./package.json");
const { showLogo } = require("./src/utils");
const { listAction, useAction } = require("./src/actions");

commander.version(pkg.version).description(showLogo(pkg.name));
commander
  .command("list")
  .alias("ls")
  .description("List all the registries")
  .action(listAction);

commander
  .command("use <registryName>")
  .description("Use the registry")
  .action(useAction);

if (process.argv && process.argv.length < 3) {
  commander.outputHelp();
}
commander.parse(process.argv);
