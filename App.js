const chalk = require("chalk");
const fs = require("fs");
const { addEntry } = require("./lib/addEntry");
const inquirer = require("inquirer");

console.log("PWD-Manager");

const args = process.argv.slice(2);
args[0];
const passwordName = args[0];

if (passwordName === "caro") {
  console.log("Your password is boldCM");
} else {
  console.log("denied access");
}

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

const questionNewEntry = {
  type: "list",
  name: "newEntry",
  message: "Do you want to add a new entry?",
  choices: ["yes", "no"],
};

async function validateAccess() {
  const { masterPassword } = await inquirer.prompt(questionPassword);
  if (masterPassword !== superSavePassword) {
    console.error(chalk.red("Fake news!"));
    // funktion hinzufügen, die den loop abbricht nach 3x falscheingabe..
    validateAccess();
    return;
  }
  const { passwordName } = await inquirer.prompt(questionForget);

  const passwordSafe = JSON.parse(fs.readFileSync("./db.json", "utf8"));

  if (passwordSafe[passwordName]) {
    console.log(chalk.green(`Name: ${passwordSafe[passwordName].name}`));
    console.log(chalk.green(`Password: ${passwordSafe[passwordName].pw}`));

    const { newEntry } = await inquirer.prompt(questionNewEntry);
    if (newEntry === "yes") {
      addEntry(passwordSafe);
    } else {
      return;
    }
  } else {
    console.log(chalk.yellow("Unknown Password"));
  }
}
validateAccess();
