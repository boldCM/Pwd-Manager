const inquirer = require("inquirer");

const questionForget = {
  type: "input",
  name: "passwordName",
  message: "Which password did you forget?",
};

async function runQuestionForget() {
  const { passwordName } = await inquirer.prompt(questionForget);
  return passwordName;
}

const questionNewEntry = {
  type: "list",
  name: "newEntry",
  message: "Do you want to add a new entry?",
  choices: ["yes", "no"],
};

async function runQuestionNewEntry() {
  const { newEntry } = await inquirer.prompt(questionNewEntry);
  return newEntry;
}

exports.runQuestionForget = runQuestionForget;
exports.runQuestionNewEntry = runQuestionNewEntry;
