const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const { readMasterPassword } = require("./validation");

async function readPasswordSafe() {
  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");

  const passwordSafe = JSON.parse(passwordSafeJSON);
  return passwordSafe;
}

async function getPassword(passwordName) {
  // hier hole ich mir die gesamte Liste:
  const passwordSafe = await readPasswordSafe();

  // dann muss ich noch gezielt das password bekommen:
  const passwordBytes = CryptoJS.AES.decrypt(
    passwordSafe[passwordName].pw,
    await readMasterPassword()
  );

  const passwordValue = passwordBytes.toString(CryptoJS.enc.Utf8);

  // const passwordNameValue = passwordSafe[passwordName];

  return passwordValue;
}

exports.readPasswordSafe = readPasswordSafe;
exports.getPassword = getPassword;
