const inquirer = require("inquirer");
const chalk = require("chalk");
const superSavePassword = "1234";

const questionPassword = {
  type: "password",
  name: "masterPassword",
  message: "What's your password?",
};

async function validateSuperSavePassword() {
  const { masterPassword } = await inquirer.prompt(questionPassword);
  if (masterPassword !== superSavePassword) {
    console.error(chalk.red("Fake news!"));
    // funktion hinzufügen, die den loop abbricht nach 3x falscheingabe..

    // validateAccess();
    return;
  }
}

exports.validateSuperSavePassword = validateSuperSavePassword;
