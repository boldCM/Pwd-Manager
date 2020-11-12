const chalk = require("chalk");
const fs = require("fs");
const { addEntry } = require("./lib/addEntry");
const inquirer = require("inquirer");
const { readCommandLineArguments } = require("./lib/commandline");
const { validateSuperSavePassword } = require("./lib/validation");
const { runQuestionForget } = require("./lib/questionForget");
const { readPasswordSafe } = require("./lib/accesDB");

// Wie soll meine App aussehen?
// 0unnötige Argumente nicht anzeigen
// 1 Name der App
// 2 Abfrage des Masterpasswordes
// 3 Will ich ein Password haben oder einen neuen Eintrag hinzufügen?
// 4 entsprechende unterfunktionen anlegen...

const args = readCommandLineArguments();

const userName = args[0];

console.log(chalk.green("PWD-Manager"));
console.log(chalk.green(`Hello ${userName} `));

const questionNewEntry = {
  type: "list",
  name: "newEntry",
  message: "Do you want to add a new entry?",
  choices: ["yes", "no"],
};

async function validateAccess() {
  await validateSuperSavePassword();

  const passwordName = await runQuestionForget();

  const passwordSafe = await readPasswordSafe();

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
