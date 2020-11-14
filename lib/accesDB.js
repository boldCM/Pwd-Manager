const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

async function readPasswordSafe() {
  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");

  const passwordSafe = JSON.parse(passwordSafeJSON);
  return passwordSafe;
}

async function getPassword(passwordName) {
  const passwordSafe = await readPasswordSafe();

  const passwordBytes = CryptoJS.AES.decrypt(
    passwordSafe[passwordName],
    "1234"
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

exports.readPasswordSafe = readPasswordSafe;
exports.getPassword = getPassword;
