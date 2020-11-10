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

const questionChange = {
  type: "input",
  name: "yes",
  message: "Do you want to change your password? [yes/no]",
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
    console.log(chalk.green(passwordSafe[passwordName]));

    const { yes } = await inquirer.prompt(questionChange);
    if (yes === "yes") {
      console.log(chalk.green("Change is about to happen..."));
    } else {
      return;
    }
  } else {
    console.log(chalk.yellow("Unknown Password"));
  }
}

validateAccess();

// const content = "Some content!";

// try {
//   const data = fs.writeFileSync("/Users/joe/test.txt", content);
//   //file written successfully
// } catch (err) {
//   console.error(err);
// }
