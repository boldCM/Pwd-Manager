const chalk = require("chalk");
const fs = require("fs");
const { addEntry } = require("./lib/addEntry");
const inquirer = require("inquirer");
const { readCommandLineArguments } = require("./lib/commandline");
const { validateSuperSavePassword } = require("./lib/validation");
const { runQuestionForget, runQuestionNewEntry } = require("./lib/questions");
const { getPassword, readPasswordSafe } = require("./lib/accesDB");
const Crypto = require("crypto-js");

// Wie soll meine App aussehen?
// 0unnötige Argumente nicht anzeigen
// 1 Name der App
// 2 Abfrage des Masterpasswordes
// 3 Will ich ein Password haben oder
//    einen neuen Eintrag hinzufügen oder
//    ein Password ändern oder
//    einen Eintrag löschen
// 4 entsprechende unterfunktionen anlegen...

const args = readCommandLineArguments();

const userName = args[0];

console.log(chalk.green("PWD-Manager"));
console.log(chalk.green(`Hello ${userName} `));

async function validateAccess() {
  await validateSuperSavePassword();

  // const passwordName = await runQuestionForget();

  const passwordSafeRead = await readPasswordSafe();

  // const passwordSafe = await getPassword(passwordName);

  // if (passwordSafe[passwordName]) {
  //   console.log(chalk.green(`Name: ${passwordSafe[passwordName].name}`));
  //   console.log(chalk.green(`Password: ${passwordSafe[passwordName].pw}`));

  const newEntry = await runQuestionNewEntry();
  if (newEntry === "yes") {
    await addEntry(passwordSafeRead);
  } else {
    return;
  }
  //  else {
  //   console.log(chalk.yellow("Unknown Password"));
  // }
}
validateAccess();
