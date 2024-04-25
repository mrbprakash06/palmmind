const express = require("express");
const connect = require("./db");
const { User } = require("./models/User");

const app = express();
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

async function run() {
  // DB Connection
  await connect();

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Listening on port", port));
}

run();
