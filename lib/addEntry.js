const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const CryptoJS = require("crypto-js");
const { readPasswordSafe } = require("./accesDB");

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

async function addEntry(passwordSafeRead) {
  // const objectTitle= answerTitle;
  const { answerTitle } = await inquirer.prompt(questionTitle);

  const { answerName } = await inquirer.prompt(questionName);

  const { answerPW } = await inquirer.prompt(questionPW);

  try {
    //file written successfully
    console.log(chalk.green("Password Changed"));
  } catch (err) {
    console.error(err);
  }

  const answerPWencrypted = CryptoJS.AES.encrypt(
    answerPW,
    await readPasswordSafe()
  ).toString();

  const content = { [answerTitle]: { [answerName]: answerPWencrypted } };

  const newObject = Object.assign(passwordSafeRead, content);
  const data = JSON.stringify(newObject, null, 2);
  fs.writeFileSync("./db.json", data);
}

exports.addEntry = addEntry;
