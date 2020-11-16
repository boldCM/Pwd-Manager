const chalk = require("chalk");
const { addEntry } = require("./lib/addEntry");
const { readCommandLineArguments } = require("./lib/commandline");
const { validateSuperSavePassword } = require("./lib/validation");
const { runQuestionForget, runQuestionNewEntry } = require("./lib/questions");
const { getPassword, readPasswordSafe } = require("./lib/accesDB");
const { connect } = require("./lib/database");
const dotenv = require("dotenv");

dotenv.config();

// Wie soll meine App aussehen?
// 0unnötige Argumente nicht anzeigen
// 1 Name der App
// 2 Abfrage des Masterpasswordes
// 3 Will ich ein Password haben oder
//    einen neuen Eintrag hinzufügen oder
//    ein Password ändern oder
//    einen Eintrag löschen
// 4 entsprechende unterfunktionen anlegen...

const args = readCommandLineArguments();

const userName = args[0];

console.log(chalk.green("PWD-Manager"));
console.log(chalk.green(`Hello ${userName} `));

async function validateAccess() {
  await validateSuperSavePassword();

  console.log(chalk.yellow("Connecting to MongoDB"));
  // funktion die zur MongoDB connected
  await connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qazjp.mongodb.net/?retryWrites=true`,
    "pw4u"
  );

  console.log(
    chalk.green("successfully connected to MongoDB, you're awesome!")
  );

  const passwordSafeRead = await readPasswordSafe();

  const passwordName = await runQuestionForget();

  if (!passwordSafeRead[passwordName]) {
    console.log(chalk.yellow("Unknown Password"));
  }

  if (passwordSafeRead[passwordName]) {
    console.log(chalk.green(`Name: ${passwordSafeRead[passwordName].name}`));
    const passwordSafe = await getPassword(passwordName);
    console.log(chalk.green(`Password: ${passwordSafe}`));
  }

  const newEntry = await runQuestionNewEntry();
  if (newEntry === "yes") {
    await addEntry(passwordSafeRead);
  } else {
    return;
  }
}
validateAccess();
