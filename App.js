console.log("wifi=123");

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const args = process.argv.slice(2);
args[0];

const passwordName = args[0];

if (passwordName === "caro") {
  console.log("Your password is boldCM");
} else {
  console.log("denied access");
}
