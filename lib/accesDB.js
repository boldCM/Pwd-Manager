const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { collection } = require("./database");
const { readMasterPassword } = require("./validation");
const chalk = require("chalk");

async function readPasswordSafe() {
  // const passwordSafeJSON = await fs.readFile("./db.json", "utf8");

  const passwordSafeJSON = await collection("passwords");

  const passwordSafe = JSON.parse(passwordSafeJSON);
  return passwordSafe;
}

async function getPassword(passwordTitle) {
  // hier hole ich mir die gesamte Liste:
  const passwordSearchTitle = await collection("passwords").findOne({
    name: passwordTitle,
  });
  if (!passwordSearchTitle) {
    throw new Error(`Password ${passwordTitle} not found`);
  }
  // dann muss ich noch gezielt das password bekommen:
  const passwordBytes = CryptoJS.AES.decrypt(
    passwordSearchTitle.value,
    await readMasterPassword()
  );

  const passwordValue = passwordBytes.toString(CryptoJS.enc.Utf8);

  console.log(chalk.green(`Name: ${passwordSearchTitle["name"]}`));

  console.log(chalk.green(`Password: ${passwordValue}`));

  return;
}

exports.readPasswordSafe = readPasswordSafe;
exports.getPassword = getPassword;
