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

exports.runQuestionForget = runQuestionForget;
