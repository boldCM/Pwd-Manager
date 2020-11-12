const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

async function readPasswordSafe(passwordName) {
  const passwordSafeJSON = await fs.readFile("./db.json", "utf8");

  // readPasswordsafe in eine extra Funktion...um dann darauf besser zuzugreifen. Kleinschrittiger defractoren!
  // sonst versuche ich beim lesen shcon zu decrypten und encrypten, das funktioniert nicht...

  const passwordSafe = JSON.parse(passwordSafeJSON);

  const passwordBytes = CryptoJS.AES.decrypt(
    passwordSafe[passwordName],
    "1234"
  );

  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

exports.readPasswordSafe = readPasswordSafe;
