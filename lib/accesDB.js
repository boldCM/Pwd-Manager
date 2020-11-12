const fs = require("fs").promises;

async function readPasswordSafe() {
  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");

  const passwordSafe = JSON.parse(passwordSafeJSON);

  return passwordSafe;
}

exports.readPasswordSafe = readPasswordSafe;
