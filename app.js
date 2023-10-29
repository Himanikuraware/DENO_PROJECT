const fs = require("fs").promises;

const text = "This is node file.";

fs.writeFile("node-message.txt", text).then(() => {
  console.log("Saved Node file!");
});
