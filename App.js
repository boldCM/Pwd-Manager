const chalk = require("chalk");

console.log("wifi=123");

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });
const args = process.argv.slice(2);
args[0];
const passwordName = args[0];

if (passwordName === "caro") {
  console.log("Your password is boldCM");
} else {
  console.log("denied access");
}

const inquirer = require("inquirer");

const superSavePassword = "squirrel";

const question = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
  {
    type: "password",
    name: "masterPassword",
    message: "What's your password?",
  },
  {
    type: "input",
    name: "passwordName",
    message: "Which password did you forget?",
  },
];

const passwordSafe = {
  wifi: "pwChristian",
  vercel: "pwVercel",
  github: "pwGithub",
};

async function validateAccess() {
  const { masterPassword, passwordName } = await inquirer.prompt(question);
  if (masterPassword !== superSavePassword) {
    console.error(chalk.red("Fake news!"));
    validateAccess();
    return;
  }

  const passwordSafeKeys = Object.keys(passwordSafe);
  if (passwordSafeKeys.includes(passwordName)) {
    console.log(chalk.green(passwordSafe[passwordName]));
  } else {
    console.log(chalk.yellow("Unknown Password"));
  }
}

validateAccess();

// const password = [
//   {
//     type: "input",
//     name: "name",
//     organisation: "VSCode",
//     realPassword: "123",
//     message: "Which password do you want to know?",
//   },
// ];

// inquirer.prompt(password).then((answers) => {
//   console.log(`Your Password is ${answers["realPassword"]}`);

//   console.log("cannot read organisation of undefined :P :P");
// });
