const chalk = require("chalk");
const fs = require("fs");

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

const questionNewEntry = {
  type: "list",
  name: "newEntry",
  message: "Do you want to add a new entry?",
  choices: ["yes", "no"],
};

const questionName = {
  type: "input",
  name: "answerName",
  message: "What's the name?",
};
const questionPW = {
  type: "input",
  name: "answerPW",
  message: "What's the pw?",
};

const questionTitle = {
  type: "input",
  name: "answerTitle",
  message: "What's the entry for?",
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

async function addEntry(passwordSafe) {
  // const objectTitle= answerTitle;
  const { answerTitle } = await inquirer.prompt(questionTitle);

  const { answerName } = await inquirer.prompt(questionName);

  const { answerPW } = await inquirer.prompt(questionPW);

  const content = { [answerTitle]: { [answerName]: answerPW } };

  try {
    //file written successfully
    console.log(chalk.green("Password Changed"));
  } catch (err) {
    console.error(err);
  }

  const newObject = Object.assign(passwordSafe, content);
  const data = JSON.stringify(newObject);
  fs.writeFileSync("./db.json", data);
}
