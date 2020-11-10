const chalk = require("chalk");

console.log("wifi=123");

const args = process.argv.slice(2);
args[0];
const passwordName = args[0];

if (passwordName === "caro") {
  console.log("Your password is boldCM");
} else {
  console.log("denied access");
}

const inquirer = require("inquirer");

const superSavePassword = "1234";

const questionPassword = {
  type: "password",
  name: "masterPassword",
  message: "What's your password?",
};

const questionForget = {
  type: "input",
  name: "passwordName",
  message: "Which password did you forget?",
};

async function validateAccess() {
  const { masterPassword } = await inquirer.prompt(questionPassword);
  if (masterPassword !== superSavePassword) {
    console.error(chalk.red("Fake news!"));
    validateAccess();
    return;
  }
  const { passwordName } = await inquirer.prompt(questionForget);
  const fs = require("fs");

  const passwordSafe = JSON.parse(fs.readFileSync("./db.json", "utf8"));

  if (passwordSafe[passwordName]) {
    console.log(chalk.green(passwordSafe[passwordName]));
  } else {
    console.log(chalk.yellow("Unknown Password"));
  }
}

validateAccess();
