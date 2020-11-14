const inquirer = require("inquirer");
const chalk = require("chalk");
// const superSavePassword = "1234";

const fs = require("fs").promises;

async function readMasterPassword() {
  return await fs.readFile("./.masterPassword", "utf8");
}

const questionPassword = {
  type: "password",
  name: "masterPassword",
  message: "What's your super save password?",
};

async function validateSuperSavePassword() {
  const { masterPassword } = await inquirer.prompt(questionPassword);
  if (masterPassword !== (await readMasterPassword())) {
    console.error(chalk.red("Fake news!"));
    // funktion hinzufügen, die den loop abbricht nach 3x falscheingabe..

    // validateAccess();
    return;
  }
}
exports.readMasterPassword = readMasterPassword;
exports.validateSuperSavePassword = validateSuperSavePassword;
