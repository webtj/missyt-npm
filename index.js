const commander = require("commander");
const pkg = require("./package.json");
const { showLogo } = require("./src/utils");
const {
  listAction,
  useAction,
  currAction,
  addAction,
  delAction,
} = require("./src/actions");

commander.version(pkg.version).description(showLogo(pkg.name));
commander
  .command("list")
  .alias("ls")
  .description("List all the registries")
  .action(listAction);

commander
  .command("current")
  .alias("cur")
  .description("show current registry")
  .action(currAction);

commander
  .command("use <name>")
  .description("Use the registry by registryName")
  .action(useAction);

commander
  .command("add <name> <url> [home]")
  .description("add registry <registryName> <registryUrl> [home]")
  .action(addAction);

commander
  .command("del <name>")
  .description("delete registry by registryName")
  .action(delAction);

if (process.argv && process.argv.length < 3) {
  commander.outputHelp();
}
commander.parse(process.argv);
